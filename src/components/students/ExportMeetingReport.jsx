import { useState } from 'react';
import { Button, Modal, Select } from 'antd';
import exportFromJSON from 'export-from-json';
import { getRecognitionByIds } from '../../api/recognition.js';

const ExportMeetingReport = ({ emoviewCode, participants, meetingName }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [format, setFormat] = useState();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleChange = (value) => {
    setFormat(value);
  };

  const handleExport = async () => {
    try {
      let ids = [];
      participants.map((value) => {
        ids.push(value.userId);
      });
      const data = await getRecognitionByIds(emoviewCode, ids, ' ');
      let datas = [];
      data.forEach((values) => {
        const transpose = (array) =>
          array[0].map((_, index) => array.map((row) => row[index]));
        const recognitionsOverview = [
          ...transpose(Object.values(values.recognitionsOverview)),
        ];
        const recognitionsSummary = [
          ...transpose(Object.values(values.recognitionsSummary)),
        ];
        let array = [];
        array.push(['User Id', values.userId]);
        recognitionsOverview.forEach((data) => {
          array.push(data);
        });
        recognitionsSummary.forEach((data) => {
          array.push(data);
        });
        const collectedValue = [...transpose(Object.values(array))];
        datas.push(collectedValue[1]);
      });
      function toObject(keys, values) {
        return keys.reduce((accumulator, key, index) => {
          return { ...accumulator, [key]: values[index] };
        }, {});
      }
      let finalArray = [];
      const labels = [
        'User',
        'Neutral',
        'Happy',
        'Sad',
        'Angry',
        'Fearful',
        'Disgusted',
        'Surprised',
        'Positive',
        'Negative',
      ];
      datas.forEach((value) => {
        finalArray.push(toObject(labels, value));
      });

      const fileName = `Students-Report_${meetingName}-Meeting`;
      let exportType;

      if (format === 'csv') {
        exportType = exportFromJSON.types.csv;
      } else if (format === 'xls') {
        exportType = exportFromJSON.types.xls;
      } else {
        exportType = exportFromJSON.types.csv;
      }

      exportFromJSON({
        data: finalArray,
        fileName: fileName,
        exportType: exportType,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Export
      </Button>
      <Modal
        title="Export Meeting's Student Reports Data "
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Close"
        cancelButtonProps={{ hidden: true }}
        okButtonProps={{ type: 'text' }}
      >
        <p>
          Export your meeting's student reports data to CSV or XLS file type
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

export default ExportMeetingReport;
