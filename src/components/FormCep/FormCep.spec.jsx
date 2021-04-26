import React from 'react'
import { render, fireEvent, act } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import FormCep from "./FormCep"

//fazendo o pc entender comandos fora do js, como o fetch
global.fetch = jest.fn().mockImplementation(() => 
    Promise.resolve({
        json: () => ({
            cep: "03047000",
            logradouro: "Rua escorpião",
            bairro: "Estrelas"
        })
    })
)



it("should render formCep", async() => {
    const { debug, getByPlaceholderText, container } = render(<FormCep />)
    //debug()
    //testando a entrada do campo placeholder do tipo input
    const cepInput = getByPlaceholderText('CEP').closest('input')
    //auto-preenchendo o campo
    fireEvent.change(cepInput, {target: {value:"03047000"}})

    await act(() => global.fetch)
    expect(global.fetch).toHaveBeenCalledTimes(1)
    expect(container).toMatchSnapshot()
    debug()
})
