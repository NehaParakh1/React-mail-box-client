import { useEffect } from "react";
import { Table, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../../store/mail-slice";

const Inbox = () => {
    const dispatch = useDispatch();
    const receivedMail = useSelector((state) => state.mail.receivedMail);
    const senderMail = useSelector((state) => state.auth.email);
    const mail = senderMail.replace("@", "").replace(".", "");
  
    const fetchReceivedMail = async () => {
      const response = await fetch(
        `https://mail-box-client-2328a-default-rtdb.firebaseio.com/rec${mail}.json`
      );
      if (!response.ok) {
        throw new Error("Could not fetch sent mail");
      }
      const data = await response.json();
      const newData = [];
      for (let key in data) {
        newData.push({ id: key, ...data[key] });
      }
      dispatch(mailActions.updateReceivedMail({ mail: newData }));
      console.log(newData);
    };
    useEffect(() => {
        fetchReceivedMail();
      }, []);
    
      return (
        <Card>
          <Card.Header>Inbox</Card.Header>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Subject</th>
                <th>Content</th>
                <th>Sender</th>
              </tr>
            </thead>
            <tbody>
              {receivedMail.map((mail) => (
                <tr key={mail.id}>
                  <td>{mail.subject}</td>
                  <td>{mail.body}</td>
                  <td>{mail.sender}</td>
                  <td>
                    <Button variant="danger">Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      );
    };


export default Inbox