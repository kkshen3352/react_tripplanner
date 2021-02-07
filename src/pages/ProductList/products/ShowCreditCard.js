import React from 'react'
import './credit-card.scss'

function getDisplayCardNumber(numberInput) {
  const placeholder = '****************'
  const newPlaceholder = placeholder.substr(numberInput.length)

  return numberInput.concat('', newPlaceholder).match(/.{1,4}/g)
}

function TextInput({ label, type = 'text', id, value, ...props }) {
  return (
    <>
      <label htmlFor={id}>{label}</label>

      <input id={id} type={type} value={value} {...props} />
    </>
  )
}

const CreditCard = ({
  cardInfo: { name, number, expiryMonth, expiryYear, cvv },
}) => {
  let cardNumber = getDisplayCardNumber(number)
  let cardName = name < 1 ? 'Name' : name
  let expiry =
    expiryMonth < 1 && expiryYear < 1 ? '00/00' : `${expiryMonth}/${expiryYear}`

  return (
    <div className="ihwovD">
      <div className="credit-card">
        <div className="cardNumber">
          <span className="numberSection">{cardNumber[0]}</span>
          <span className="numberSection">{cardNumber[1]}</span>
          <span className="numberSection">{cardNumber[2]}</span>
          <span className="numberSection">{cardNumber[3]}</span>
          {cardNumber[4] && (
            <span className="numberSection">{cardNumber[4]}</span>
          )}
        </div>
        <div className="cardInfo">
          <div className="cardName">
            <span>Card Holder</span>
            <p>{cardName}</p>
          </div>
          <div className="cardExpiry">
            <span>Expires</span>
            <p>{expiry}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const CardForm = ({
  cardInfo: { name, number, expiryMonth, expiryYear, cvv },
  onChange,
}) => (
  <div className="kiFrMj">
    <ul className="card-ul">
      <li>
        <TextInput
          label="持卡人姓名"
          id="name"
          type="text"
          value={name}
          onChange={(e) => onChange({ key: 'name', value: e.target.value })}
          minLength="5"
          maxLength="20"
          required
        />
      </li>
      <li>
        <TextInput
          label="卡號"
          id="number"
          type="text"
          value={number}
          onChange={(e) => onChange({ key: 'number', value: e.target.value })}
          placeholder="**** **** **** ****"
          minLength="12"
          maxLength="16"
          required
        />
      </li>
      <li>
        <TextInput
          label="有效月"
          id="expiryMonth"
          type="text"
          value={expiryMonth}
          onChange={(e) =>
            onChange({ key: 'expiryMonth', value: e.target.value })
          }
          placeholder="MM"
          minLength="2"
          maxLength="2"
          required
        />
      </li>
      <li>
        <TextInput
          label="有效年"
          id="expiryYear"
          type="text"
          value={expiryYear}
          onChange={(e) =>
            onChange({ key: 'expiryYear', value: e.target.value })
          }
          placeholder="YY"
          minLength="2"
          maxLength="2"
          required
        />
      </li>
      <li>
        <TextInput
          label="CVV"
          id="cvv"
          type="password"
          value={cvv}
          onChange={(e) => onChange({ key: 'cvv', value: e.target.value })}
          minLength="3"
          maxLength="3"
        />
      </li>
    </ul>
  </div>
)

const ShowCreditCard = () => {
  const initialState = {
    name: '',
    number: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
  }

  const inputReducer = (state, action) => {
    return { ...state, [action.key]: action.value }
  }

  const [cardInfo, handleOnChange] = React.useReducer(
    inputReducer,
    initialState
  )

  return (
    <div className="show-time">
      <CreditCard cardInfo={cardInfo} />
      <CardForm cardInfo={cardInfo} onChange={handleOnChange} />
    </div>
  )
}

export default ShowCreditCard
