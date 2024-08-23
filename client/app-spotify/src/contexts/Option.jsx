import React, { createContext, useState } from 'react';

export const OptionContext = createContext({
    selectedOption: null,
    setSelectedOption: () => {},
});

export const OptionProvider = ({ children }) => {
    const [selectedOption, setSelectedOption] = useState('');

    return (
        <OptionContext.Provider value={{ selectedOption, setSelectedOption }}>
            {children}
        </OptionContext.Provider>
    );
};
