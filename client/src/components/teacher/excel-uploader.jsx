import * as XLSX from "xlsx";
import { Button } from "../ui/button";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { coleAPI } from "@/lib/utils";

const ExcelUploader = ({ department, year, subject, setData }) => {
  const [changed, setChanged] = useState(false);
  const [extractedData, setExtractedData] = useState(null);
  const inputRef = useRef(null);

  const { mutateAsync: sendChangesToServer } = useMutation({
    mutationFn: coleAPI("/grades/uploadexcel", "POST"),
    onSuccess: () => {
      toast("Success!", {
        description: "Changes saved.",
        style: {
          fontSize: "1rem",
          backgroundColor: "#d4edda",
          color: "#155724",
        },
      });
      setChanged(false);
    },
    onError: (e) => {
      if (e.response?.data?.message) {
        toast("Error!", {
          description: e.response?.data?.message,
          style: {
            fontSize: "1rem",
            backgroundColor: "#f8d7da",
            color: "#721c24",
          },
        });
      } else {
        toast("Error!", {
          description: "Unable to connect to the server.",
          style: {
            fontSize: "1rem",
            backgroundColor: "#f8d7da",
            color: "#721c24",
          },
        });
      }
    },
  });

  const saveChanges = async () => {
    if (extractedData) {
      sendChangesToServer({
        excelData: extractedData,
        fileName: `${department}-${year}-${subject.code}.xlsx`,
      });
    }
  };

  const handleUploadChange = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];

    if (file?.name.endsWith(".xlsx")) {
      const nameArray = file.name.slice(0, -5).split("-");
      console.log(nameArray);
      if (
        nameArray[0].toUpperCase().trim() === department &&
        nameArray[1].trim() === year &&
        nameArray[2].trim() === subject.code
      ) {
        reader.onload = (e) => {
          const arrayBuffer = e.target.result;
          const workbook = XLSX.read(arrayBuffer, { type: "array" });

          const jsonData = XLSX.utils.sheet_to_json(
            workbook.Sheets[workbook.SheetNames[0]],
            { header: 1 }
          );
          setData(jsonData);
          setExtractedData(jsonData);
        };

        reader.readAsArrayBuffer(file);
        setChanged(true);
      } else {
        toast("Unable to load this file!", {
          description: `Invalid file format or department. Please make sure that you're uploading a file with this format: ${department}-${year}-${subject.code}.xlsx`,
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
      <div className="flex flex-col gap-0.5">
        <Button size="sm" onClick={handleUpload}>
          Upload excel file
        </Button>
        {changed && (
          <Button
            size="sm"
            onClick={saveChanges}
            className="bg-green-700 hover:bg-green-500"
          >
            Save Changes
          </Button>
        )}
      </div>
    </div>
  );
};

export default ExcelUploader;
