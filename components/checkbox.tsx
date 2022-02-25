



export default function CheckBox(props : React.InputHTMLAttributes<HTMLInputElement>) {

    return <label className="checkbox">
        <input type="checkbox" className="_cb" {...props} />
        <div className="_box">
            <div className="_handler"></div>
        </div>
    </label>
}