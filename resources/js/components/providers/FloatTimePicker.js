import React, { useState } from "react";
import { TimePicker } from "antd";

const FloatTimePicker = (props) => {
    const [focus, setFocus] = useState(false);
    let {
        label,
        value,
        placeholder,
        required,
        popupClassName,
        format,
        disabled,
        id,
        onChange,
        allowClear,
        className,
        size,
        onBlur,
    } = props;

    if (!placeholder) placeholder = label;

    const isOccupied = focus || (value && value.length !== 0);

    const labelClass = isOccupied ? "label float-label" : "label";

    const requiredMark = required ? (
        <span className="text-danger">*</span>
    ) : null;

    return (
        <div
            className={`float-wrapper float-date-picker ${className ?? ""}`}
            onBlur={() => setFocus(false)}
            onFocus={() => setFocus(true)}
        >
            <TimePicker
                id={id ?? ""}
                onChange={(time, timeString) => onChange(time, timeString)}
                value={value ? value : null}
                size={size ?? ""}
                placeholder={[""]}
                popupClassName={popupClassName ?? ""}
                format={format ? format : "HH:mm"}
                allowClear={allowClear ?? false}
                onBlur={(time, timeString) => {
                    if (onBlur) {
                        onBlur(time, timeString);
                    }
                }}
                disabled={disabled ? disabled : false}
            />

            <label className={labelClass}>
                {isOccupied ? label : placeholder} {requiredMark}
            </label>
        </div>
    );
};

export default FloatTimePicker;
