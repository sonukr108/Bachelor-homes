import React, { useState } from 'react'
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { MdOutlineBedroomParent } from "react-icons/md";
import { IoPeopleOutline, IoHomeOutline } from "react-icons/io5";
import { LuPhoneCall } from "react-icons/lu";
import Weekly from '../components/Weekly';
import Monthly from '../components/Monthly';
import Yearly from '../components/Yearly';

const Dashboard = () => {
    const [orderHistoryValue, setOrderHistoryValue] = useState("weekly");
    const [activeChatValue, setActiveChatValue] = useState("weekly");

    const orderHistoryHandleChange = (e) => setOrderHistoryValue(e.target.value);
    const activeChatHandleChange = (e) => setActiveChatValue(e.target.value);
    const parseChartData = (data, labelKey) => data.map(item => ({ name: item[labelKey], value: item.value }));

    const getChartSizeClass = (view) => {
        switch (view) {
            case "weekly": return "w-full max-w-[450px] h-[230px] md:h-[300px]";
            case "monthly": return "w-full max-w-[400px] h-[200px] md:h-[250px]";
            case "yearly": return "w-full max-w-[600px] h-[260px] md:h-[320px]";
            default: return "w-full h-[250px]";
        }
    };

    // Temporary Data for Order Stats
    const RoomAddedData = {
        weekly: [
            { day: "Mon", value: 10 },
            { day: "Tue", value: 20 },
            { day: "Wed", value: 15 },
            { day: "Thu", value: 25 },
            { day: "Fri", value: 30 },
            { day: "Sat", value: 18 },
            { day: "Sun", value: 22 }
        ],
        monthly: [
            { week: "Week 1", value: 80 },
            { week: "Week 2", value: 120 },
            { week: "Week 3", value: 100 },
            { week: "Week 4", value: 150 }
        ],
        yearly: [
            { month: "Jan", value: 300 },
            { month: "Feb", value: 250 },
            { month: "Mar", value: 400 },
            { month: "Apr", value: 350 },
            { month: "May", value: 500 },
            { month: "Jun", value: 450 },
            { month: "Jul", value: 420 },
            { month: "Aug", value: 480 },
            { month: "Sep", value: 470 },
            { month: "Oct", value: 520 },
            { month: "Nov", value: 390 },
            { month: "Dec", value: 600 }
        ]
    };

    // Temporary Data for Chat Stats
    const RoomBookedData = {
        weekly: [
            { day: "Mon", value: 5 },
            { day: "Tue", value: 7 },
            { day: "Wed", value: 4 },
            { day: "Thu", value: 8 },
            { day: "Fri", value: 6 },
            { day: "Sat", value: 9 },
            { day: "Sun", value: 10 }
        ],
        monthly: [
            { week: "Week 1", value: 25 },
            { week: "Week 2", value: 30 },
            { week: "Week 3", value: 40 },
            { week: "Week 4", value: 35 }
        ],
        yearly: [
            { month: "Jan", value: 100 },
            { month: "Feb", value: 120 },
            { month: "Mar", value: 90 },
            { month: "Apr", value: 110 },
            { month: "May", value: 150 },
            { month: "Jun", value: 130 },
            { month: "Jul", value: 140 },
            { month: "Aug", value: 160 },
            { month: "Sep", value: 170 },
            { month: "Oct", value: 180 },
            { month: "Nov", value: 150 },
            { month: "Dec", value: 200 }
        ]
    };

    const StatCard = ({ title, count, icon: Icon }) => (
        <div className="bg-[#FEDAFF] p-4 rounded-lg flex justify-between items-center w-full max-w-md shadow-md">
            <div className="w-[70%]">
                <p className="text-gray-700 text-md font-medium">{title}</p>
                <h2 className="text-4xl font-bold text-black">{count}</h2>
            </div>
            <div className="w-[20%] flex justify-center pt-1 pb-7">
                <div className="bg-[#6C3483] h-[50px] lg:h-[55px] w-[50px] lg:w-[55px] rounded-full p-3 flex items-center justify-center">
                    {Icon && <Icon className="text-white w-6 h-6 lg:w-8 lg:h-8" />}
                </div>
            </div>
        </div>
    );

    return (
        <div className='flex flex-col md:flex-row h-screen w-screen overflow-hidden'>
            <Sidebar />
            <div className='bg-[#FAEEFF] flex-1 flex flex-col overflow-hidden'>
                <Navbar />
                <div className='flex-1 overflow-y-auto overflow-x-hidden scroll-hidden px-2 md:px-4'>
                    <div className='bg-white m-auto mt-2 lg:mt-4 box-border w-full p-3 md:p-5 md:rounded-lg grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3'>
                        <StatCard title="Total owners" count={20} icon={IoPeopleOutline} />
                        <StatCard title="Total rooms" count={42} icon={IoHomeOutline} />
                        <StatCard title="Total room booked" count={30} icon={MdOutlineBedroomParent} />
                        <StatCard title="Total callback request" count={50} icon={LuPhoneCall} />
                    </div>
                    <div className="m-auto my-2 lg:my-4 flex flex-col xl:flex-row gap-4 w-full">
                        {/* Order History */}
                        <div className="w-full xl:w-1/2 bg-white p-4 rounded-md flex flex-col gap-3">
                            <div className='w-full flex justify-between items-center'>
                                <p className='md:text-lg text-md font-semibold'>Room added</p>
                                <select
                                    value={orderHistoryValue}
                                    onChange={orderHistoryHandleChange}
                                    className="border-2 border-[#6C3483] px-2 py-1 rounded-md text-[#6C3483] cursor-pointer"
                                >
                                    <option value="weekly">Weekly</option>
                                    <option value="monthly">Monthly</option>
                                    <option value="yearly">Yearly</option>
                                </select>
                            </div>
                            <div className="flex-grow flex items-center justify-center">
                                {orderHistoryValue === "weekly" ? (
                                    <Weekly data={parseChartData(RoomAddedData.weekly, "day")} dataKey="value" className={getChartSizeClass(orderHistoryValue)} />
                                ) : orderHistoryValue === "monthly" ? (
                                    <Monthly data={parseChartData(RoomAddedData.monthly, "week")} dataKey="value" className={getChartSizeClass(orderHistoryValue)} />
                                ) : (
                                    <Yearly data={parseChartData(RoomAddedData.yearly, "month")} dataKey="value" className={getChartSizeClass(orderHistoryValue)} />
                                )}
                            </div>
                        </div>

                        {/* Active Chats */}
                        <div className="w-full xl:w-1/2 bg-white p-4 rounded-md flex flex-col gap-3">
                            <div className='w-full flex justify-between items-center'>
                                <p className='md:text-lg text-md font-semibold'>Room booked</p>
                                <select
                                    value={activeChatValue}
                                    onChange={activeChatHandleChange}
                                    className="border-2 border-[#6C3483] px-2 py-1 rounded-md text-[#6C3483] cursor-pointer"
                                >
                                    <option value="weekly">Weekly</option>
                                    <option value="monthly">Monthly</option>
                                    <option value="yearly">Yearly</option>
                                </select>
                            </div>
                            <div className="flex-grow flex items-center justify-center">
                                {activeChatValue === "weekly" ? (
                                    <Weekly data={parseChartData(RoomBookedData.weekly, "day")} dataKey="value" className={getChartSizeClass(activeChatValue)} />
                                ) : activeChatValue === "monthly" ? (
                                    <Monthly data={parseChartData(RoomBookedData.monthly, "week")} dataKey="value" className={getChartSizeClass(activeChatValue)} />
                                ) : (
                                    <Yearly data={parseChartData(RoomBookedData.yearly, "month")} dataKey="value" className={getChartSizeClass(activeChatValue)} />
                                )}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Dashboard
