import { useState } from 'react';
import { Button, Modal, Select, Tooltip } from 'antd';
import exportFromJSON from 'export-from-json';
import { BiExport } from 'react-icons/bi';

const ExportModal = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [format, setFormat] = useState();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleChange = (value) => {
    setFormat(value);
  };

  const handleExport = () => {
    const { __typename, ...rest } = data;
    const labels = [
      'Timestamp',
      'Neutral',
      'Happy',
      'Sad',
      'Angry',
      'Fearful',
      'Disgusted',
      'Surprised',
      'Image',
    ];
    const transpose = (array) =>
      array[0].map((_, index) => array.map((row) => row[index]));
    const datas = [...transpose(Object.values(rest))];
    const fileName = `Meeting - ${new Date().toLocaleString()}`;

    function toObject(keys, values) {
      return keys.reduce((accumulator, key, index) => {
        return { ...accumulator, [key]: values[index] };
      }, {});
    }

    let array = [];

    datas.forEach((data) => {
      array.push(toObject(labels, data));
    });

    let exportType;

    if (format === 'csv') {
      exportType = exportFromJSON.types.csv;
    } else if (format === 'xls') {
      exportType = exportFromJSON.types.xls;
    } else {
      exportType = exportFromJSON.types.csv;
    }

    exportFromJSON({
      data: array,
      fileName: fileName,
      exportType: exportType,
    });
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Tooltip title="Export emotion data">
        <button
          className="bg-transparent border-0 rounded-full cursor-pointer hover:bg-[#f1f2f6]"
          aria-label="Export emotion data"
          onClick={showModal}
        >
          <BiExport className="text-black/[.60] text-lg" />
        </button>
      </Tooltip>
      <Modal
        title="Export Emotion Data"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Close"
        cancelButtonProps={{ hidden: true }}
        okButtonProps={{ type: 'text' }}
      >
        <p>
          Export your meeting's emotion recognition data to CSV or XLS file type
        </p>
        <div className="flex items-center space-x-2">
          <Select
            defaultValue="csv"
            style={{
              width: 120,
            }}
            onChange={handleChange}
            options={[
              {
                value: 'csv',
                label: 'CSV',
              },
              {
                value: 'xls',
                label: 'XLS',
              },
            ]}
          />
          <Button type="primary" onClick={handleExport}>
            Export
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default ExportModal;
