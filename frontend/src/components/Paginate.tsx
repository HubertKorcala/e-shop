import { Link } from "react-router-dom";

const Paginate: React.FC<{
  pages: number;
  page: number;
  isAdmin?: boolean;
  keyword?: string;
}> = ({ pages, page, isAdmin = false, keyword = "" }) => {
  return (
    pages > 1 && (
      <div className="join">
        {[...Array(pages).keys()].map((x) => (
          <Link
            key={x + 1}
            to={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${x + 1}`
                  : `/page/${x + 1}`
                : `/admin/productlist/${x + 1}`
            }
          >
            <button
              className={`join-item btn ${page === x + 1 && "btn-active"}`}
            >
              {x + 1}
            </button>
          </Link>
        ))}
      </div>
    )
  );
};

export default Paginate;
