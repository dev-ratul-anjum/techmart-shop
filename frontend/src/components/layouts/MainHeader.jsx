import CategoryNav from "./CategoryNav";
import Header from "./Header";
import "./MainHeader.css";

const MainHeader = ({user}) => {
    return (
        <div className="main-header">
             <Header user={user}/>
             <CategoryNav/>
        </div>
    );
};

export default MainHeader;