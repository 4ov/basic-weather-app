import { ArrowLeft, Settings } from "react-feather";

export default function PageHeader({ title, onBack, onRight }) {
  return <div className="_header">
      <div className="_corner">
      {
          onBack && <ArrowLeft style={{ cursor : "pointer" }} onClick={onBack} />
      }
      <h1>{ title }</h1>
      </div>
      <div className="_corner">
        {onRight}
      </div>
  </div>;
}
