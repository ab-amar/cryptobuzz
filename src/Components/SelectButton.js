import React from 'react'

const SelectButton = ({children,selected, onClick}) => {
  return (
    <span className={`select_button ${selected?"selected_button":""}`}
        onClick={onClick}
    >
      {children}
    </span>
  )
}

export default SelectButton;
