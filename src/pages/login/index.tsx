import React from 'react';
import { ContainerForm } from '../../components/containerForm';
import { WrapperContent } from '../../components/wrapperContent';
import { BannerLogin } from '../../components/bannerLogin';
import { Form } from '../../components/form';

export const Login = ()=>{
    return(
        <WrapperContent>
            <BannerLogin />
            <ContainerForm>
                <Form mode='login'/>
            </ContainerForm>
        </WrapperContent>
    )
}