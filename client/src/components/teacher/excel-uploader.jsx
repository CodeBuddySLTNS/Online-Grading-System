import * as XLSX from "xlsx";
import { Button } from "../ui/button";
import { useRef } from "react";
import { toast } from "sonner";

const ExcelUploader = ({ department, year, setData }) => {
  const inputRef = useRef(null);

  const handleUploadChange = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];

    if (file?.name.endsWith(".xlsx")) {
      const nameArray = file.name.slice(0, -5).split("-");
      console.log(nameArray);
      if (
        nameArray[0].toUpperCase().trim() === department &&
        nameArray[1].trim() === year
      ) {
        reader.onload = (e) => {
          const arrayBuffer = e.target.result;
          const workbook = XLSX.read(arrayBuffer, { type: "array" });

          const jsonData = XLSX.utils.sheet_to_json(
            workbook.Sheets[workbook.SheetNames[0]],
            { header: 1 }
          );
          setData(jsonData);
        };

        reader.readAsArrayBuffer(file);
      } else {
        toast("Unable to load this file!", {
          description: `Invalid file format or department. Please make sure that you're uploading a file with this format: ${department}-${year}.xlsx`,
          duration: 8000,
          style: {
            fontSize: "1rem",
            backgroundColor: "#f8d7da",
            color: "#721c24",
          },
        });
      }
    }
  };

  const handleUpload = () => {
    inputRef.current?.click();
  };

  return (
    <div>
      <input
        type="file"
        accept=".xlsx, .xls"
        ref={inputRef}
        className="hidden"
        onChange={handleUploadChange}
      />
      <Button size="sm" onClick={handleUpload}>
        Upload excel file
      </Button>
    </div>
  );
};

export default ExcelUploader;
