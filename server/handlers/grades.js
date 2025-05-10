const XLSX = require("xlsx");

const grades = async (req, res) => {
  res.send("grades");
};

const uploadexcel = async (req, res) => {
  const { excelData, fileName } = req.body;
  const ws = XLSX.utils.aoa_to_sheet(excelData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  await XLSX.writeFile(wb, "./" + fileName);

  res.send({ message: "Changes saved successfully." });
};

module.exports = { grades };
