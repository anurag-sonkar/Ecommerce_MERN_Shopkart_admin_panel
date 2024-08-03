import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Modal, Input } from "antd";
import Loader from "../components/Loader";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { deleteColor, getAllColors, updateColor } from "../features/color/colorSlice";

function Colors() {
  const dispatch = useDispatch();
  const { colors, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.colors
  );
  console.log({ colors, isLoading, isError, isSuccess, message })

  const [updatedColor, setUpdatedColor] = useState("");
  const [updateId, setUpdateId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (id, color) => {
    setUpdateId(id);
    setUpdatedColor(color);
    setIsModalOpen(true);
  };

  const handleUpdateColor = () => {
    dispatch(updateColor({ updatedColor , updateId }))
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    dispatch(getAllColors());
  }, [dispatch]);

  const columns = [
    {
      title: "SNo",
      dataIndex: "sno",
      key: "sno",
      sorter: (a, b) => a.sno - b.sno,
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
      sorter: (a, b) => a.color.localeCompare(b.color),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];

  const dataSource = colors.map((color, index) => ({
    key: color._id,
    sno: index + 1,
    color: color.color,
    action: (
      <div className="flex items-center gap-5">
        <Link>
          <FaEdit size={20} onClick={() => showModal(color._id, color.color)} />
        </Link>
        <Link>
          <MdDelete
            size={22}
            color="crimson"
            onClick={() => dispatch(deleteColor(color._id))}
          />
        </Link>
      </div>
    ),
  }));
  

  return (
    <section className="mt-4">
      <h1 className="text-3xl font-bold my-4">Colors List</h1>
      {isLoading && <Loader />}
      {isError && <p>Error: {message}</p>}
      {isSuccess && <Table dataSource={dataSource} columns={columns} />}
      <Modal
        title="Update Color"
        open={isModalOpen}
        onOk={handleUpdateColor}
        onCancel={handleCancel}
      >
        <div className="flex justify-between items-start w-96">
          <div className="font-semibold text-2xl">Color Selected :</div>
          <div>
          <input type="color" value={updateColor}  onChange={(e) => setUpdatedColor(e.target.value)} className="w-24 h-12"/>
          </div>
          <div className="text-gray-600 text-xl font-semibold">{updatedColor}</div>
        </div>
      </Modal>
    </section>
  );
}

export default Colors;
