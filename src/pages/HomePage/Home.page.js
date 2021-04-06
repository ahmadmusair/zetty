import { memo, useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";

import Navbar from "../../components/Navbar";

import services from "../../services";
import { storeManyIdea } from "../../store/idea.actions";
import { useStore } from "../../store";
import utils from "../../utils";
import IdeaCard from "../../components/IdeaCard/IdeaCard";
import constants from "../../constants";

function HomePage() {
  const [store, dispatch] = useStore();
  const [error, setError] = useState(undefined);

  useEffect(() => {
    const fetchIdeas = async () => {
      const fetchedIdeas = await services.idea
        .fetch({
          end: utils.dateFns.getUnixTime(new Date()),
          limit: 10,
        })
        .catch(setError);
      dispatch(storeManyIdea(fetchedIdeas));
    };

    if (store.idea.data.length === 0) {
      fetchIdeas();
    }
  }, []);

  return error ? (
    <Redirect to="/error" />
  ) : (
    <Container>
      <Row style={{ maxWidth: "500px", margin: "0px auto" }}>
        <Navbar />
        {store.idea.data.sort(byCreatedTime).map((idea) => (
          <IdeaCard key={idea.id} idea={idea} />
        ))}
      </Row>
    </Container>
  );
}

function byCreatedTime(firstIdea, secondIdea) {
  return secondIdea.createdTime - firstIdea.createdTime;
}

export default memo(HomePage);
