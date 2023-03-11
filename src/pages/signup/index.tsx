import React from 'react';
import { ContainerForm } from '../../components/containerForm';
import { WrapperContent } from '../../components/wrapperContent';
import { BannerLogin } from '../../components/bannerLogin';
import { Form } from '../../components/form';

export const Signup = ()=>{
    return(
        <WrapperContent>
            <BannerLogin />
            <ContainerForm>
                <Form mode='signup'/>
            </ContainerForm>
        </WrapperContent>
    )
}