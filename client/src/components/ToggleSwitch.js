import React from 'react';
import './ToggleSwitch.css';

const ToggleSwitch = ({ checked, handleToggle }) => {
  	return (
		<>
			<input
				checked={checked}
				onChange={handleToggle}
				className="react-switch-checkbox"
				id={`react-switch-new`}
				type="checkbox"
			/>
			<label
				style={{ background: checked && '#06D6A0' }}
				className="react-switch-label"
				htmlFor={`react-switch-new`}
			>
				<span className={`react-switch-button`} />
			</label>
		</>
  	);
};

export default ToggleSwitch;