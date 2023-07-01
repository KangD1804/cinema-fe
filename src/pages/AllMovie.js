import React from "react";
import Movie from "../components/Movie/Movie";
export default function AllMovie() {
  return (
      <>
        <Movie />
      </>
  );

}

/*
import React, { useEffect, useState } from "react";
import MovieItem from "../components/Movie/Movie";
import {movieManagement} from "../services/MovieManagementServices";

const AllMovie = () => {
    const [movieList, setMovieList] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMovieList(currentPage);
    }, []);

    const fetchMovieList = (page) => {
        console.log("Fetching movie list...");
        movieManagement
            .getMovieListWithPagination(page, 10)
            .then((result) => {
                setMovieList(result.data.dataList.dataList);
                setTotalPages(result.data.dataList.totalPage);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err.response.data);
            });
    };

    const handlePreviousPage = () => {
        const prevPage = currentPage - 1;
        if (prevPage >= 0) {
            fetchMovieList(prevPage);
            setCurrentPage(prevPage);
        }
    };

    const handleNextPage = () => {
        const nextPage = currentPage + 1;
        if (nextPage < totalPages) {
            fetchMovieList(nextPage);
            setCurrentPage(nextPage);
        }
    };

    const renderMovieList = () => {
        return movieList.map((movie, index) => {
            return <MovieItem movieItem={movie} key={index} />;
        });
    };

    return (
        <div>
            <h1>All Movies</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <div className="movie-list">{renderMovieList()}</div>
                    <div className="pagination">
                        <button onClick={handlePreviousPage} disabled={currentPage === 0}>
                            Previous
                        </button>
                        <span style={{ color: "white" }}>{currentPage + 1}</span>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages - 1}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllMovie;*/
