import { Button, Select } from 'antd';
import { Modal, Table } from 'antd';
import exportFromJSON from 'export-from-json';
import { useEffect } from 'react';
import { useState } from 'react';
import { IoArchiveOutline } from 'react-icons/io5';
import { getMeeting } from '../../api/meeting';
import { getArchive } from '../../api/recognition';

const ArchiveModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataSource, setDataSource] = useState();
  const [selectedCode, setSelectedCode] = useState([]);
  const [format, setFormat] = useState();

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
    },
    {
      title: 'Class Code',
      dataIndex: 'meetCode',
    },
    {
      title: 'Meeting Code',
      dataIndex: 'emoviewCode',
    },
  ];

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange = (value) => {
    setFormat(value);
  };

  const fetchMeetings = async () => {
    try {
      const data = await getMeeting();
      const array = data.map((data, index) => ({
        ...data,
        key: `${index + 1}`,
      }));
      setDataSource(array);
    } catch (error) {
      console.log(error);
    }
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      let selected = [];
      selectedRows.map((data) => selected.push(data.emoviewCode));
      setSelectedCode(selected);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      // Column configuration not to be checked
      name: record.name,
    }),
  };

  const handleExportData = async () => {
    try {
      const data = await getArchive(selectedCode);
      console.log(data);

      const { ...rest } = data.recognitionsDetail;
      const labels = [
        'Timestamp',
        'Class Code',
        'Meeting Code',
        'User',
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
        const obj = keys.reduce((accumulator, key, index) => {
          return { ...accumulator, [key]: values[index] };
        }, {});

        return obj;
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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, []);

  return (
    <>
      <a className="flex items-center space-x-2" onClick={showModal}>
        <IoArchiveOutline />
        <span>Archive</span>
      </a>
      <Modal
        title="Archive Emotion Data"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Close"
        cancelButtonProps={{ hidden: true }}
        okButtonProps={{ type: 'text' }}
        width={920}
      >
        <div className="space-y-4">
          <p>
            Export your meeting's emotion recognition data to CSV or XLS file
            type. You can select multiple meetings at once by clicking the
            checkbox
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
            <Button
              disabled={selectedCode === [] || selectedCode.length === 0}
              type="primary"
              onClick={handleExportData}
            >
              Export
            </Button>
          </div>
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={dataSource}
            pagination={{
              pageSize: 25,
            }}
            scroll={{
              y: 240,
            }}
          />
        </div>
      </Modal>
    </>
  );
};

export default ArchiveModal;
