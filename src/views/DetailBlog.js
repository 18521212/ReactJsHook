import { useParams, useNavigate } from "react-router-dom";
import useData from "../custom/fetch";
import './Blog.scss';

const DetailBlog = () => {
    let {id} = useParams();
    let navigate = useNavigate();
    const {data: dataBlogDetail, isLoading, isError}
        = useData(`https://jsonplaceholder.typicode.com/posts/${id}`, false)
    const handleBackData = () => {
        return navigate("/blog");
    }
    console.log('use', useParams())
    return (
        <>
            <div> <span onClick={handleBackData}>&lt;-- Back</span></div>
            <div className="blog-detail">
                {dataBlogDetail &&
                    <>
                        <div className="title">
                            Blog ID: {id} ---- {isLoading ===true ? 'Loading data' : dataBlogDetail.title}
                        </div>
                        <div className="content">
                            {dataBlogDetail.body}
                        </div>
                    </>
                }
            </div>
        </>
    )
}

export default DetailBlog;