import React, {useState} from "react";
import Modal from "./Modal";
import {useGetLeadsQuery, useDeleteLeadMutation} from "../redux/leadsAPI"
import {Lead} from "../utils/leadType"

export default function LeadsPage() {
    const [isModalOpen, setModalOpen] = useState(false);
    const {data: leads, error, isLoading, refetch} = useGetLeadsQuery({});
    const [deleteLead] = useDeleteLeadMutation();

    const toggleModal = () => {
        setModalOpen(!isModalOpen);
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteLead(id.toString()).unwrap();
            refetch();
        } catch (err) {
            console.error("Не вдалося видалити лід", err);
        }
    };

    return (
        <div className="inner-main-container">
            <div className="main-header">
                <p className="styled-header-text">Всі ліди</p>
                <button onClick={toggleModal} className="primary-button">Створити ліда</button>
            </div>
            <Modal show={isModalOpen} onClose={toggleModal}>
            </Modal>
            <p>Результатів знайдено: {leads ? leads.length : 0}</p>
            <div className="table-wrapper">
                <table>
                    <thead>
                    <tr>
                        <th>ПІБ</th>
                        <th>ID</th>
                        <th>Вік</th>
                        <th>Стать</th>
                        <th>Номер телефону</th>
                        <th>Дата створення</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {isLoading ? (
                        <tr>
                            <td colSpan={7}>Завантаження...</td>
                        </tr>
                    ) : error ? (
                        <tr>
                            <td colSpan={7}>Помилка завантаження даних</td>
                        </tr>
                    ) : (
                        leads?.map((lead: Lead) => (
                            <tr key={lead.id}>
                                <td>{`${lead.name} ${lead.lastName}`}</td>
                                <td>{lead.id}</td>
                                <td>{lead.age} років</td>
                                <td>{lead.sex === "male" ? "Чоловіча" : "Жіноча"}</td>
                                <td>{lead.phone}</td>
                                <td>{lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : 'Невідомо'}</td>
                                <td>
                                    <button onClick={() => handleDelete(lead.id)} className="table-button">Видалити
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}