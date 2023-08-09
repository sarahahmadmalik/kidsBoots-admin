import Sidebar from "./Sidebar";
import {useRouter} from "next/router";
import {useState} from 'react'
import {UserOutlined} from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image"
import {
    Avatar,
    Button,
    Dropdown,
    Input,
    Layout,
    Spin
} from "antd";
const {Header, Content} = Layout;
import {Menu} from "antd";
import routes from "@/routes/routes";
import {
    MenuOutlined,
    DashboardOutlined,
    ShoppingCartOutlined,
    AppstoreAddOutlined,
    UnorderedListOutlined,
    HistoryOutlined,
    StarOutlined,
    SettingOutlined,
    DownOutlined
} from "@ant-design/icons";

import {Inter} from "next/font/google";

const font361 = Inter({
    subsets: ["latin"],
    weight: [
        "200",
        "300",
        "400",
        "500",
        "600",
        "700",
        "800",
        "900"
    ]
});


const Index = ({children}) => {
    const router = useRouter();
    const [selectedMenuItem, setSelectedMenuItem] = useState("Dashboard");

    const handleMenuClick = (item) => {
        setSelectedMenuItem(item.key);
    };

    const navMenu = (
        <Menu>
            <Menu.Item key="Orders"
                icon={<DashboardOutlined/>}
                onClick={handleMenuClick}>
                <Link href="/">
                    Orders
                </Link>
            </Menu.Item>
            <Menu.Item key="Products"
                icon={<UserOutlined/>}
                onClick={handleMenuClick}>
                <Link href="/products">
                    Products
                </Link>
            </Menu.Item>
            <Menu.Item key="Buyers"
                icon={<ShoppingCartOutlined/>}
                onClick={handleMenuClick}>
                <Link href="/buyers">
                    Buyers
                </Link>
            </Menu.Item>
            <Menu.Item key="Sellers"
                icon={<AppstoreAddOutlined/>}
                onClick={handleMenuClick}>
                <Link href="/sellers">
                    Sellers
                </Link>
            </Menu.Item>
            <Menu.Item key="Earning"
                icon={<UnorderedListOutlined/>}
                onClick={handleMenuClick}>
                <Link href="/earning">
                    Earning
                </Link>
            </Menu.Item>
            <Menu.Item key="Profile"
                icon={<HistoryOutlined/>}
                onClick={handleMenuClick}>
                <Link href="/profile">
                    Profile
                </Link>
            </Menu.Item>
        </Menu>
    );


    const getPageTitle = (path) => {
        let route = routes.find((r) => r.path === path);
        if (! route) {
            if (path === "/") {
                route = routes.find((r) => r.path === "/")
                return route.title
            }
        }
        return route ? route.title : "";
    }

    const adminImageSrc = "/images/admin.svg";


    const items = [
        {
            key: "2",
            label: (
                <div style={
                    {
                        display: "flex",
                        flexDirection: "column"
                    }
                }>
                    <span className="text-sm md:text-lg font-medium font-poppins"
                        style={
                            {
                                textTransform: "capitalize",
                                color: "#F49342"
                            }
                    }>
                        {/* {data?.name} */}
                        John Doe
                    </span>
                    <span className="text-black opacity-50 text-xs md:text-sm font-normal font-poppins"
                        style={
                            {
                                textTransform: "capitalize",
                                opacity: "60"
                            }
                    }>
                        {/* {data?.role} */}
                        Admin
                    </span>
                </div>
            )
        }, {
            key: "1",
            label: (
                <span className="text-red-600 opacity-50 text-xs md:text-base font-normal font-poppins"
                    style={
                        {color: "red"}
                    }
                    // onClick={() => logoutMutation.mutate()}
                >
                    Logout
                </span>
            )
        },
    ];

    return (
        <Layout style={
            {minHeight: "100vh"}
        }>
            <Sidebar role={"admin"}/>
            <Layout className="site-layout">
                <Header className="flex items-center justify-between w-full "
                    style={
                        {
                            paddingTop: 20,
                            paddingBottom: 20,
                            height: "4rem",
                            paddingLeft: 4,
                            paddingRight: 0,
                            backgroundColor: "#F9F9F9"
                        }
                }>


                    <div className="flex items-center justify-between w-full bg-[#FFFFFF] border border-[#C2C2C266]  px-5">
                        <div>
                            <h1 className={
                                `text-[24px] font-[700] font-inter`}
                            >
                                {
                                getPageTitle(router.pathname)
                            }</h1>
                        </div>
                        <div className="flex">
                            <div className="cursor-pointer">
                                <Dropdown menu={
                                        {items}
                                    }
                                    placement="bottomRight">
                                    <div className="flex items-center">
                                        <div className="mr-2">
                                            <Image src={adminImageSrc}
                                                alt="Admin Image"
                                                width={40}
                                                height={40}
                                                className="flex items-center justify-center bg-[#0852C1] cursor-pointer rounded-full"/>
                                        </div>
                                        <div>
                                            <Image src="/images/dropdown.svg" alt="Admin Image"
                                                width={10}
                                                height={10}
                                                className="flex items-center justify-center cursor-pointer rounded-full"/>
                                        </div>
                                    </div>
                                </Dropdown>
                            </div>
                            <div className="md:hidden flex">
                                <Dropdown overlay={navMenu}
                                    trigger={
                                        ["click"]
                                }>
                                    <a className="text-[#0852C1]">
                                        <MenuOutlined style={
                                            {fontSize: "24px"}
                                        }/>
                                    </a>
                                </Dropdown>
                            </div>
                        </div>


                    </div>
                </Header>
                <Content>{children}</Content>
            </Layout>
        </Layout>
    );
};

export default Index;
