import React,{useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashCan } from "@fortawesome/free-regular-svg-icons";

const Row = (props) => {
  const [over, setOver] = useState(false);
  const [over1, setOver1] = useState(false);
  const id = props.value.Id;

  const update = () => {
    console.log("updating");
    props.updatehandle(id);
  };

  const Delete = () => {
    console.log("Deleting");
    props.deletehandle(id);
  };
  // const style = over ? { color: "red" } : {}
  return (
    <tr onClick={()=>console.log(id)}>
      <td>{props.value.Id}</td>
      <td>{props.value.firstName}</td>
      <td>{props.value.lastName}</td>
      <td>{props.value.otherName}</td>
      <td>{props.value.admissionNumber}</td>
      <td>{props.value.className}</td>
      <td>{props.value.classArmId}</td>
      <td>{props.value.dateCreated}</td>
      <td>
        <FontAwesomeIcon
          onMouseOver={() => setOver(true)}
          onMouseLeave={() => setOver(false)}
          style={over ? { color: "blue",cursor:"pointer" } : {}}
          icon={faEdit}
          onClick={update}
        />
      </td>

      <td>
        <FontAwesomeIcon
          onMouseOver={() => {setOver1(true)}}
          onMouseLeave={() => setOver1(false)}
          style={over1 ? { color: "red",cursor:"pointer" } : {}}
          icon={faTrashCan}
          onClick={Delete}
        />
      </td>
    </tr>
  );
};

export default Row;
