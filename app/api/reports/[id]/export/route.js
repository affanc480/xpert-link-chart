import PDFDocument from "pdfkit";
import ExcelJS from "exceljs";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/rbac";
import { handleApiError, ApiError } from "@/lib/response";

// GET /api/reports/:id/export?format=pdf|xlsx
export async function GET(request, { params }) {
  try {
    const user = await requireUser();
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const format = (searchParams.get("format") || "pdf").toLowerCase();

    const report = await prisma.report.findFirst({ where: { id, userId: user.id } });
    if (!report) throw new ApiError("Report not found.", 404);

    if (format === "xlsx") {
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet(report.title.slice(0, 31) || "Report");

      sheet.addRow(["Title", report.title]);
      sheet.addRow(["Type", report.type]);
      sheet.addRow(["Generated", report.createdAt.toISOString()]);
      sheet.addRow([]);

      const rows = Array.isArray(report.data) ? report.data : [];
      if (rows.length) {
        const headers = Object.keys(rows[0]);
        sheet.addRow(headers);
        rows.forEach((row) => sheet.addRow(headers.map((h) => row[h])));
      }

      const buffer = await workbook.xlsx.writeBuffer();

      return new Response(buffer, {
        headers: {
          "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "Content-Disposition": `attachment; filename="${report.title.replace(/[^a-z0-9]/gi, "_")}.xlsx"`,
        },
      });
    }

    // Default: PDF
    const doc = new PDFDocument({ margin: 50 });
    const chunks = [];
    doc.on("data", (chunk) => chunks.push(chunk));

    const pdfBuffer = await new Promise((resolve, reject) => {
      doc.on("end", () => resolve(Buffer.concat(chunks)));
      doc.on("error", reject);

      doc.fontSize(20).text(report.title, { underline: true });
      doc.moveDown();
      doc.fontSize(12).text(`Type: ${report.type}`);
      doc.text(`Generated: ${report.createdAt.toLocaleString()}`);
      doc.moveDown();

      const rows = Array.isArray(report.data) ? report.data : [];
      if (rows.length) {
        const headers = Object.keys(rows[0]);
        doc.fontSize(11).text(headers.join(" | "));
        doc.moveDown(0.3);
        rows.forEach((row) => {
          doc.text(headers.map((h) => String(row[h] ?? "")).join(" | "));
        });
      } else {
        doc.text("No data attached to this report.");
      }

      doc.end();
    });

    return new Response(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${report.title.replace(/[^a-z0-9]/gi, "_")}.pdf"`,
      },
    });
  } catch (err) {
    return handleApiError(err);
  }
}
