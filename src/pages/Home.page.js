import { memo, useState, useEffect } from "react";
import { Container, Row, Button, Image } from "react-bootstrap";

import IdeaModal from "../components/IdeaModal";
import Navbar from "../components/Navbar";

import services from "../services";
import { storeManyIdea } from "../store/idea.actions";
import { useStore } from "../store";
import utils from "../utils";
import IdeaCard from "../components/IdeaCard/IdeaCard";

function HomePage() {
  const [store, dispatch] = useStore();

  useEffect(() => {
    (async () => {
      const fetchedIdeas = await services.idea.fetch({
        end: utils.dateFns.getUnixTime(new Date()),
        limit: 10,
      });

      dispatch(storeManyIdea(fetchedIdeas));
    })();
  }, []);

  return (
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
