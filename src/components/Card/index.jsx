
function Card (props) {
    const {name, price, description, status, id, index} = props.phone;
    const {deleteItem} =props;

    return (
        <div className="card text-center w-25 shadow-lg p-3 mb-5 bg-body-tertiary rounded">
            <div className="card-header">Phone</div>
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <h5 className="card-title">${price}</h5>
                <p className="card-text">{description}</p>
                <h5 className={`card-title ${status == 'active' ? 'text-primary' : 'text-success'}`}>{status}</h5>
                <button onClick={() => {deleteItem(id)}} className="btn btn-danger">Dalite</button>
            </div>
            <div className="card-footer text-body-secondary">2 days ago</div>
        </div>
    )
}

export default Card