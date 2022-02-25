import { useClickAway } from "react-use";
import { proxy, useSnapshot } from "valtio";
import { useEffect, useRef } from "preact/hooks";
const dialogData = proxy({
  type: null,
  title: null,
  message: null,
  onCancel: null,
  onConfirm: null,
  ignorable: null,
});

export function Confirm({ message, title, onConfirm, onCancel, ignorable, ...rest }) {
  const ref = useRef();
  useClickAway(ref, () => {
    ignorable && hideDialog();
  });
  return (
    <div ref={ref} className="dialog confirm" {...rest}>
      <div className="title">{title}</div>

      <div className="message">{message}</div>

      <div className="controls">
        <button className="primary_button" onClick={onConfirm ?? (() => {})}>
          Confirm
        </button>
        <button className="primary_button" onClick={onCancel ?? (() => {})}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export function showDialog({
  message,
  title,
  onCancel,
  onConfirm,
  ignorable = true,
}) {
  dialogData.type = "confirm";
  dialogData.message = message;
  dialogData.title = title;
  dialogData.onCancel = onCancel;
  dialogData.onConfirm = onConfirm;
  dialogData.ignorable = ignorable;
}

export function hideDialog() {
  dialogData.type = null;
  dialogData.message = null;
  dialogData.title = null;
  dialogData.onCancel = null;
  dialogData.onConfirm = null;
}

export function Appender() {
  const data = useSnapshot(dialogData);

  return (
    <div className={`dialog_space ${data.type ? "animate" : ""}`}>
      {data.type && data.type === "confirm" && (
        <Confirm
          ignorable={data.ignorable}
          message={data.message}
          title={data.title}
          onCancel={data.onCancel}
          onConfirm={data.onConfirm}
        />
      )}
    </div>
  );
}
