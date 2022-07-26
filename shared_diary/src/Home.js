import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { format, addMonths, subMonths } from 'date-fns';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { isSameMonth, isSameDay, addDays, parse } from 'date-fns';
import axios from 'axios'

const RenderHeader = ({ currentMonth, prevMonth, nextMonth }) => {
    const logout = () => {
        axios.get("http://127.0.0.1:8000/logout/")
        .then(res => {
            console.log(res.data);
        }).catch(err => {
            console.log(err);
    });
    }

    return (
        <div>
            <div className="menu">
                <div className="top-left">
                    <Link className="pen-icon" to="/page">
                        <Icon icon="ep:edit-pen"/>
                    </Link>
                </div>
                <div className="top-right">
                    <button className="logout_btn" onClick={logout}>
                        <p1>로그아웃</p1>
                    </button>
                    <div className="notifications">
                        <Icon icon="ep:bell"/>
                        <p> 마우스 오버시 알림메세지 </p>
                    </div>
                    <div className="user">
                        <Icon icon="ep:user"/>
                    </div>
                </div>
            </div>
            
            <div className="header row">
                <div className="col col-start">
                    <Icon icon="ep:arrow-left-bold" onClick={prevMonth} />
                    <span className="text">
                        {format(currentMonth, 'yyyy  ')}
                        {format(currentMonth, ' M')}월
                    </span>
                    <Icon icon="ep:arrow-right-bold" onClick={nextMonth} />
                </div>
            </div>
        </div>
    );
};

const RenderDays = () => {
    const days = [];
    const date = ['Sun', 'Mon', 'Thu', 'Wed', 'Thrs', 'Fri', 'Sat'];

    for (let i = 0; i < 7; i++) {
        days.push(
            <div className="col" key={i}>
                {date[i]}
            </div>,
        );
    }

    return <div className="days row">{days}</div>;
};

const RenderCells = ({ currentMonth, selectedDate, onDateClick }) => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            formattedDate = format(day, 'd');
            const cloneDay = day;
            days.push(
                <div
                    className={`col cell ${
                        !isSameMonth(day, monthStart)
                            ? 'disabled'
                            : isSameDay(day, selectedDate)
                            ? 'selected'
                            : format(currentMonth, 'M') !== format(day, 'M')
                            ? 'not-valid'
                            : 'valid'
                    }`}
                    key={day}
                    onClick={() => onDateClick(parse(cloneDay))}
                >
                    <span
                        className={
                            format(currentMonth, 'M') !== format(day, 'M')
                                ? 'text not-valid'
                                : ''
                        }
                    >
                        {formattedDate}
                    </span>
                </div>,
            );
            day = addDays(day, 1);
        }
        rows.push(
            <div className="row" key={day}>
                {days}
            </div>,
        );
        days = [];
    }
    return <div className="body">{rows}</div>;
};

export const Home = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    const prevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };
    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };
    const onDateClick = (day) => {
        setSelectedDate(day);
    };
    return (
        <div>
            <div className="calendar">
                <RenderHeader
                    currentMonth={currentMonth}
                    prevMonth={prevMonth}
                    nextMonth={nextMonth}
                />
                <RenderDays />
                <RenderCells
                    currentMonth={currentMonth}
                    selectedDate={selectedDate}
                    onDateClick={onDateClick}
                />
            </div>
        </div>
    );
};

export default Home;