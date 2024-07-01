import removeFromTempFolder from "../../utils/removeFromTempFolder.js";
import xlsx from "xlsx";

const xlToJson = async (file) => {
  const workbook = xlsx.readFile(file.path);

  const sheetName = workbook.SheetNames[0];
  if (!sheetName) {
    throw new Error("No sheets found in the Excel file");
  }

  const jsonData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

  removeFromTempFolder(file.filename);
  return jsonData;
};

export const XlToJsonService = {
  xlToJson,
};
