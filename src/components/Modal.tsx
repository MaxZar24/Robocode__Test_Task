import React, {useEffect} from "react";
import {SubmitHandler, useForm} from 'react-hook-form';
import CrossIcon from '../assets/images/crossIcon.svg'
import {useCreateLeadMutation, useGetLeadsQuery} from "../redux/leadsAPI";

interface ModalProps {
    show: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

interface FormData {
    lastName: string;
    name: string;
    dateOfBirth: string;
    sex: string;
    phone: string;
}

const calculateAge = (dateOfBirth: string): number => {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};

const formatPhoneNumber = (phone: string): string => {
    const cleaned = ('' + phone).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return phone;
};

const Modal: React.FC<ModalProps> = ({show, onClose}) => {
    const {register, handleSubmit, formState: {errors}} = useForm<FormData>();
    const [createLead] = useCreateLeadMutation();
    const {refetch} = useGetLeadsQuery({});

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        const age = calculateAge(data.dateOfBirth);
        const dateCreated = new Date().toLocaleDateString();
        const formattedPhone = formatPhoneNumber(data.phone);

        try {
            await createLead({...data, age, dateCreated, phone: formattedPhone}).unwrap();
            onClose();
            await refetch();
        } catch (error) {
            console.error('Помилка створення ліда:', error);
        }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
            onClose();
        }
    };

    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    useEffect(() => {
        if (show) {
            document.addEventListener('keydown', handleKeyDown);
            return () => document.removeEventListener('keydown', handleKeyDown);
        }
    }, [show]);

    if (!show) {
        return null;
    }

    return (
        <div onClick={handleOverlayClick} className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <p>Створення ліда</p>
                    <img onClick={onClose} src={CrossIcon} alt="close-window"/>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-container">
                        <div className="input-field">
                            <label>Прізвище:</label>
                            <input type="text"
                                   placeholder="Введіть прізвище"
                                   {...register("lastName", {required: true})}
                                   className={errors.lastName ? 'error' : ''}
                            />
                            {errors.lastName && <span className="error-message">Це поле є обов'язковим</span>}
                        </div>
                        <div className="input-field">
                            <label>Ім'я:</label>
                            <input type="text"
                                   placeholder="Введіть ім'я"
                                   {...register("name", {required: true})}
                                   className={errors.name ? 'error' : ''}
                            />
                            {errors.name && <span className="error-message">Це поле є обов'язковим</span>}
                        </div>
                        <div className="input-field">
                            <label>Дата народження:</label>
                            <input type="date"
                                   placeholder="Виберіть дату народження"
                                   {...register("dateOfBirth", {required: true})}
                                   className={errors.dateOfBirth ? 'error' : ''}
                            />
                            {errors.dateOfBirth && <span className="error-message">Це поле є обов'язковим</span>}
                        </div>
                        <div className="input-field">
                            <label>Стать:</label>
                            <select {...register("sex", {required: true})} defaultValue=""
                                    className={errors.sex ? 'error' : ''}>
                                <option value="" disabled>Виберіть стать</option>
                                <option value="male">Чоловіча</option>
                                <option value="female">Жіноча</option>
                            </select>
                            {errors.sex && <span className="error-message">Це поле є обов'язковим</span>}
                        </div>
                        <div className="input-field">
                            <label>Номер телефону:</label>
                            <input type="tel"
                                   placeholder="Введіть номер телефону"
                                   {...register("phone", {required: true})}
                                   className={errors.phone ? 'error' : ''}
                            />
                            {errors.phone && <span className="error-message">Введіть коректний номер телефону</span>}
                        </div>
                    </div>
                    <div className="button-container">
                        <button onClick={onClose} className="decline-button">Відмінити</button>
                        <button type="submit" className="primary-button">Створити</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default Modal;
