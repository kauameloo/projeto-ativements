import React from "react";

export const Input = (props) => {
  return (
    <div className={props.styles}>
      <label className="block md:text-sm text-lg mb-2" htmlFor={props.id}>
        {props.children}
      </label>

      <input
        className="w-full py-2 px-3 border border-complementary-black rounded "
        id={props.id}
        disabled={props.disabled}
        min="0"
        type={props.type}
        autoComplete="off"
        required
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
};

export const Select = (props) => {
  return (
    <div className={props.styles}>
      <label className="block md:text-sm text-lg mb-2" htmlFor={props.id}>
        {props.children}
      </label>

      <input
        list="list-places"
        className="w-full py-2 px-3 border border-complementary-black rounded "
        id={props.id}
        type="text"
        autoComplete="off"
        required
        value={props.value}
        onChange={props.onChange}
      />
      <datalist id="list-places">
        {props.places.map((item, index) => {
          return <option key={index} value={item.nome}></option>;
        })}
      </datalist>
    </div>
  );
};
