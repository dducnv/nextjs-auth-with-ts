// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import httpProxy, { ProxyResCallback } from "http-proxy";
import Cookies from 'cookies';

type Data = {
    message: string
}
export const config = {
    api: {
        bodyParser: false
    }
}

const proxy = httpProxy.createProxyServer();

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method !== 'POST') {
        return res.status(404).json({ message: "method not supported" })
    }
    return new Promise(resolve => {
        req.headers.cookie = '';

        const handleLoginRes: ProxyResCallback = (proxyRes, req, res) => {
            let body = '';
            proxyRes.on('data', (chunk) => {
                body += chunk;
            })
            proxyRes.on('end', () => {
                try {
                    const { accessToken, expiresIn } = JSON.parse(body);
                    const cookies = new Cookies(req, res, { secure: process.env.NODE_ENV !== 'development' });
                    cookies.set('access_token', accessToken, {
                        httpOnly: true,
                        sameSite: 'lax',
                        expires: new Date(expiresIn) //Long type
                    });
                    (res as NextApiResponse).status(200).json({ message: 'login success' });
                } catch (err) {
                    console.log(err);
                    (res as NextApiResponse).status(500).json({ message: 'somthing went wrong' });
                }
                resolve(true);
            })
        }
        proxy.once('proxyRes', handleLoginRes)
        proxy.web(req, res, {
            target: process.env.API_URL,
            changeOrigin: true,
            selfHandleResponse: true
        })
    })

}
