import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Navbar as NativeNavbar,
  Button,
} from "react-bootstrap";
import { Redirect, useHistory, useParams } from "react-router";

import services from "../../services";

import Navbar from "../../components/Navbar";
import IdeaCard from "../../components/IdeaCard/IdeaCard";
import Reply from "../../components/Reply";
import Loading from "../../components/Loading";

import "./ThreadPage.css";

function ThreadPage() {
  const params = useParams();
  const history = useHistory();

  const [isLoadingIdea, setIsLoadingIdea] = useState(true);
  const [isError, setIsError] = useState(undefined);

  const [idea, setIdea] = useState(undefined);
  useEffect(() => {
    services.idea
      .fetchByID(params.ideaID)
      .then(setIdea)
      .catch(setIsError)
      .finally(() => setIsLoadingIdea(false));
  }, [params.ideaID]);

  const [replies, setReplies] = useState([]);
  useEffect(() => {
    if (!!idea) {
      const unsubscribe = services.idea
        .fetchByRepliedID(idea.id)
        .onSnapshot((ideasSnapshot) => {
          const ideas = ideasSnapshot.docs.map((idea) => ({ ...idea.data(), id: idea.id })) // prettier-ignore
          console.log("ideas", ideas);
          setReplies(ideas);
        }, setIsError);

      return () => {
        unsubscribe();
      };
    }
  }, [idea]);

  if (isError) {
    return <Redirect to="/error" error={JSON.stringify(isError)} />;
  }

  return isLoadingIdea ? (
    <Loading />
  ) : (
    <Container>
      <Row style={{ maxWidth: "500px", margin: "0px auto" }}>
        <Navbar
          left={() => (
            <NativeNavbar.Brand className="ms-2">
              <BackButton onClick={history.goBack} />
            </NativeNavbar.Brand>
          )}
        />
        <div style={{ height: "32px" }} />
        {idea && <IdeaCard key={idea.id} idea={idea} />}
        <Replies replies={replies} />
        <div style={{ height: "128px" }} />
      </Row>
    </Container>
  );
}

function BackButton(props) {
  return (
    <div className="d-flex align-row align-items-center">
      <Button
        onClick={props.onClick}
        variant="transparent"
        className="p-0 d-flex align-row align-items-center justify-content-center">
        <i className="bi bi-arrow-left-circle-fill fs-4 btn--rounded btn--black" />
      </Button>
      <h1 className="fs-3 mb-0 ms-1">Thread</h1>
    </div>
  );
}

function Replies(props) {
  return props.replies
    .sort(ascendingByCreatedTime)
    .map((reply, i, replies) => (
      <Reply key={reply.id} idea={reply} isLast={isLast(i, replies)} />
    ));
}

function isLast(index, array) {
  return index === array.length - 1;
}

function ascendingByCreatedTime(a, b) {
  return a.createdTime - b.createdTime;
}

export default ThreadPage;
