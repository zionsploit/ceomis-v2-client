'use server'

import { ResponseLoginMessage } from "@/entity/Response.enum";
import { axiosClient, AxiosClientRequestHeaders } from "@/provider/axiosClient";
import { RequestUserLogin, ResponseLogin } from "@/types/Users";
import { AxiosResponse, HttpStatusCode } from "axios";
import { cookies } from "next/headers";
import { decodeSdJwt, getClaims } from '@sd-jwt/decode';
import { digest } from '@sd-jwt/crypto-nodejs';
import { SessionData, UsersData } from "@/types/utils";
import { cipher_session_data } from "@/utils/crypto";

type State = {
    message: ResponseLoginMessage,
    response: string
}

export async function actionLogin (state: State, data: RequestUserLogin) {
    const cookieStore = await cookies()

    const requestHeaders: AxiosClientRequestHeaders = {
        auth: "",
        sid: ""
    }
    
    const response: AxiosResponse<ResponseLogin> = await axiosClient(requestHeaders).post("/users/login", data)

    if (response.status == HttpStatusCode.Ok) {
        const header = response.headers;

        const get_cookie = header['cookie']

        const parse_data = String(get_cookie).split("; ")

        if (parse_data[0]) {
            const sid = parse_data[1].split("=")[1]
            const auth = parse_data[0].split("=")[1]

            if (auth != undefined) {
                const sdjwt = auth
                const decode_jwt = await decodeSdJwt(sdjwt, digest)
                
                const claims = await getClaims(
                    decode_jwt.jwt.payload,
                    decode_jwt.disclosures,
                    digest,
                ) satisfies { exp: string, sub: string };

                if (claims != null) {
                    const decoded_sub: UsersData | undefined = JSON.parse(atob(claims.sub))

                    if (decoded_sub != undefined) {
                        const session_data: SessionData = {
                            users: decoded_sub,
                            auth: auth,
                            sid: sid
                        }

                        const encrypt = cipher_session_data(session_data)

                        cookieStore.set('_auth', encrypt)
                    }
                }

            }

        }
        return {
            message: ResponseLoginMessage.LoginSuccess,
            response: ""
        }
    }

    return {
        message: ResponseLoginMessage.InvalidCredentials,
        response: ""
    }
}