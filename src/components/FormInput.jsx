/* eslint-disable react/prop-types */
import React from "react";

const FormInput = ({
  value,
  type = "text",
  onChange,
  label,
  placeholder,
  labelTextSize = "sm",
  className = "",
  required = false,
  isTextarea = false, // New prop to handle textarea
  ...props
}) => {
  return (
    <div>
      <label
        className={`block text-${labelTextSize} font-medium text-gray-700`}
      >
        {label}
      </label>
      {isTextarea ? (
        <textarea
          value={value}
          onChange={onChange}
          className={`mt-2 block w-full rounded-lg border-gray-300 shadow-sm p-2 text-gray-900 ${className}`}
          placeholder={placeholder}
          required={required}
          {...props}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          className={`mt-2 block w-full rounded-lg border-gray-300 shadow-sm p-2 text-gray-900 ${className}`}
          placeholder={placeholder}
          required={required}
          {...props}
        />
      )}
    </div>
  );
};

export default FormInput;
