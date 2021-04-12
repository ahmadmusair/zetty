import React, { memo, useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import services from "../../services";
import utils from "../../utils";
import { storeManyIdea } from "../../store/idea.actions";
import { useStore } from "../../store";

import Navbar from "../../components/Navbar";
import IdeaCard from "../../components/IdeaCard/IdeaCard";
import Loading from "../../components/Loading";

function HomePage() {
  const [store, dispatch] = useStore();
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (store.idea.data.length === 0) {
      fetchIdeas();
    }
  }, []);

  const fetchIdeas = () => {
    setIsLoading(true);
    services.idea
      .rawFetch({
        end: utils.dateFns.getUnixTime(new Date()),
        limit: 5,
      })
      .then(mapToIdeas)
      .then(saveToGlobalStore(dispatch))
      .catch(setError)
      .finally(() => setIsLoading(false));
  };

  const fetchMore = () => {
    if (!isLoading && hasMore) {
      setIsLoading(true);

      const lastIdea = store.idea.data[store.idea.data.length - 1];
      services.idea
        .rawFetch({
          end: lastIdea.createdTime,
          limit: 5,
        })
        .then((snap) => {
          if (snap.empty) {
            setHasMore(false);
            return [];
          } else {
            return mapToIdeas(snap);
          }
        })
        .then(saveToGlobalStore(dispatch))
        .catch(setError)
        .finally(() => setIsLoading(false));
    }
  };

  return error ? (
    <Redirect to="/error" />
  ) : (
    <Container>
      <Row
        style={{
          maxWidth: "500px",
          margin: "0px auto",
          paddingBottom: "128px",
        }}>
        <Navbar />
        <div style={{ height: "32px" }} />
        <InfiniteScroll
          dataLength={store.idea.data.length}
          next={fetchMore}
          hasMore={hasMore}
          scrollThreshold="100px"
          loader={<Loading />}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }>
          {store.idea.data.sort(byCreatedTime).map((idea) => (
            <React.Fragment key={idea.id}>
              <IdeaCard key={idea.id} idea={idea} />
              <div style={{ height: "16px" }} />
            </React.Fragment>
          ))}
        </InfiniteScroll>
      </Row>
    </Container>
  );
}

function mapToIdeas(snap) {
  return snap.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
}

function saveToGlobalStore(dispatch) {
  return function (ideas) {
    dispatch(storeManyIdea(ideas));
  };
}

function byCreatedTime(firstIdea, secondIdea) {
  return secondIdea.createdTime - firstIdea.createdTime;
}

export default memo(HomePage);
