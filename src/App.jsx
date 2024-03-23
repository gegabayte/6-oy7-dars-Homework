import { useState, useEffect, useRef } from 'react'
import './App.css'
import Card from './components/Card';
import {PuffLoader} from 'react-spinners'


function App() {
  const [phones, setPhones] = useState([]);
  const [pending, setPending] =useState(false);




  useEffect(() => {
    fetch('https://auth-rg69.onrender.com/api/products/all')
      .then(res => res.json())
      .then(data => {
        setPhones(data)
      })
      .catch(err => {
        console.log(err);
      })
  }, [])


  const nameRef = useRef('');
  const priceRef = useRef(0);
  const descRef = useRef('');
  const statusRef = useRef('active');

  function validate(nameRef, priceRef, descRef, statusRef) {
    if (!nameRef.current.value) {
      alert('name is empty');
      return false;
    }

    if (!priceRef.current.value) {
      alert('price is empty');
      return false;
    }

    if (!descRef.current.value) {
      alert('description is empty');
      return false;
    }

    if (!statusRef.current.value) {
      alert('status is empty');
      return false;
    }



    return true;
  }

  function handleClick(e) {
    e.preventDefault();
    setPending(true)
    let isValid = validate(nameRef, priceRef, descRef, statusRef);
    if (isValid) {
      const phone = {
        name: nameRef.current.value,
        price: priceRef.current.value,
        description: descRef.current.value,
        status: statusRef.current.value,
        category__id: 2
      }
      fetch('https://auth-rg69.onrender.com/api/products', {
        method: 'POST',
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(phone)
      })
        .then(res => res.json())
        .then(data => {
         let copied = JSON.parse(JSON.stringify(phones))
         copied.push(data)
         setPhones(copied)
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          nameRef.current.value = ''
          priceRef.current.value = ''
          descRef.current.value = ''
          statusRef.current.value = ''
          setPending(false)
        })

    }


  }


  function handleDelite (id) {
   
    let isDelete = confirm('Rostan ham ushbu malumotni ochirmohchimisiz?');
    if (isDelete && id) {
      fetch(`https://auth-rg69.onrender.com/api/products/${id}`, {
        method: "DELETE"
      })
      .then(res => res.json())
      .then(data => {
        if (data.message == "Mahsulot muvaffaqiyatli o'chirildi") {
          let copied = JSON.parse(JSON.stringify(phones));
          copied = copied.filter(el => {
            return el.id != id;
          })
          setPhones(copied)
        }
      })
      .catch(err => {
        console.log(err);
      })
    }
  }




  return (
    <>
      <div className="container">
    
        <h1 className='my-4 text-center'>Phones</h1>
        <form className='form d-flex flex-column w-50 mx-auto shadow-lg p-3 mb-5 bg-body-tertiary rounded' >
          <div className="mb-4">
            <label for="name" className="form-label">Enter Name <span style={{color: 'red'}}>*</span></label>
            <input ref={nameRef} type="text" className="form-control" id="name" placeholder="Enter Name" />
          </div>
          <div className="mb-4">
            <label for="price" className="form-label">Enter price <span style={{color: 'red'}}>*</span></label>
            <input ref={priceRef} type="number" className="form-control" id="price" placeholder="Enter price" />
          </div>
          <div className="mb-4">
            <label for="textarea" className="form-label">Enter description <span style={{color: 'red'}}>*</span></label>
            <textarea ref={descRef} style={{ resize: "none" }} className="form-control" id="textarea" placeholder='Enter Description' rows="3"></textarea>
          </div>
          <select ref={statusRef} className="form-select form-control">
            <option value="active">Active</option>
            <option value="inactive">InActive</option>
          </select>
          <button disabled={pending ? true : false} onClick={handleClick} className='my-4 btn btn-primary'>{pending ? 'Loading...' : 'Save'}</button>
        </form>

        <div className="card__wrapper d-flex flex-wrap gap-4 justify-content-center">
          {
            phones.map((el, index) => {
              return (
                <Card deleteItem = {handleDelite} key={index} phone={el}></Card>
              )
            })
          }
        </div>
      </div>
    </>
  )
}

export default App
