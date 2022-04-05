import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import ErrorPage from "./ErrorPage";

const md5 = require("blueimp-md5");
const publickey = "94dce821bcc69c8477eae0f5f7e93282";
const privatekey = "c7b613766b1bd35402222ad08ff78df0e8739617";
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);
const baseUrl = "https://gateway.marvel.com:443/v1/public/comics";
const url = baseUrl + "?ts=" + ts + "&apikey=" + publickey + "&hash=" + hash;

const SingleCharacter = () => {
  const [singleComic, setSingleComic] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(url + "&id=" + id);
        setSingleComic(data.data.results);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        setError(true);
        console.log(e);
      }
    }
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div>
        <h2>Loading....</h2>
      </div>
    );
  } else {
    return (
      <>
        {error ? (
          <ErrorPage name={"Comic"} />
        ) : (
          <div className="p-3 mb-2 bg-dark text-white">
            <h2>Single Comic</h2>
            {singleComic.map((chars) => {
              const { id, title, description } = chars;
              return (
                <div key={id} className="container">
                  <div className="row">
                    <div className="col-sm">
                      <h3>{title}</h3>
                      <img
                        className="img-thumbnail"
                        src={`${chars.thumbnail.path}.${chars.thumbnail.extension}`}
                        alt={title}
                        aria-label="Comics Logo"
                      />

                      <p>{description}</p>
                    </div>
                    <div className="col-sm">
                      <h3>Featured Series</h3>
                      <Link
                        to={`/series/${chars.series.resourceURI
                          .substring(chars.series.resourceURI.lastIndexOf("/"))
                          .substring(1)}`}
                      >
                        <p className="text-white">{chars.series.name}</p>
                      </Link>
                    </div>
                    <div className="col-sm">
                      <h3>Featured Characters</h3>
                      {chars.characters.items.map((items) => {
                        return (
                          <div key={items.resourceURI}>
                            <Link
                              to={`/characters/${items.resourceURI
                                .substring(items.resourceURI.lastIndexOf("/"))
                                .substring(1)}`}
                            >
                              <p className="text-white">{items.name}</p>
                            </Link>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </>
    );
  }
};

export default SingleCharacter;
