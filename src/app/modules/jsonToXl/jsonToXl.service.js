import removeFromTempFolder from "../../utils/removeFromTempFolder.js";
import XLSX from "xlsx";

const jsonToXl = async (file) => {
  console.log(file);

  const workbook = XLSX.utils.book_new();

  // Convert data to worksheet
  const worksheet = XLSX.utils.json_to_sheet(file);

  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // Write to file
  XLSX.writeFile(workbook, file.path);

  console.log(
    `Excel file "${path.basename(filePath)}" created successfully at "${
      file.path
    }"`
  );

  const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

  removeFromTempFolder(file.filename);
  return jsonData;
};

export const jsonToXlService = {
  jsonToXl,
};
