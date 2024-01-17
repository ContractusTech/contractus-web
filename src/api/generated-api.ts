/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Id {
  id: string
}

export interface Success {
  success: boolean
}

export interface Error {
  code?: number
  error?: string
}

export interface Balance {
  estimateAmount: string
  blockchain: string
  tokens?: {
    /** @pattern ^[0-9]+$ */
    value: string
    token?: {
      code: string
      address: string
    }
  }[]
  wrap?: string[]
  tier: 'basic' | 'holder'
}

export interface Account {
  publicKey: string
  blockchain: string
  /** @format date-time */
  createdAt?: string
  isPublic?: boolean
  displayName?: string
  description?: string
}

export type AccountList = {
  publicKey: string
  blockchain: string
  /** @format date-time */
  createdAt?: string
  isPublic?: boolean
  displayName?: string
  description?: string
}[]

export interface Topup {
  methods?: {
    url: string
    type: string
  }[]
}

export type Statistics = {
  type: 'LOCKED' | 'REVENUE_30' | 'REVENUE_ALL' | 'PAID_30' | 'PAID_ALL'
  /** @format float */
  amount: number
  /** @default "USD" */
  currency: 'USD'
}[]

export type Deals = {
  id: string
  blockchain: string
  /** @default "NONE" */
  performanceBondType: 'ONLY_CLIENT' | 'ONLY_EXECUTOR' | 'BOTH' | 'NONE'
  /** @default "NONE" */
  completionCheckType: 'CHECKER' | 'NONE'
  /** @format date-time */
  createdAt: string
  /** @format date-time */
  updatedAt?: string
  /** @format date-time */
  endedAt?: string
  /** @format date-time */
  deadline: string
  token?: {
    code: string
    address: string
  }
  amount: string
  amountFee: string
  ownerPublicKey: string
  contractorPublicKey?: string
  checkerPublicKey?: string
  /** @default "NEW" */
  status:
    | 'NEW'
    | 'STARTED'
    | 'STARTING'
    | 'FINISHED'
    | 'FINISHING'
    | 'CANCELED'
    | 'CANCELING'
    | 'REVOKED'
  /** @default "CLIENT" */
  ownerRole: 'CLIENT' | 'EXECUTOR'
  encryptedSecretKey?: string
  secretKeyHash?: string
  sharedKey?: string
  ownerBondAmount?: string
  ownerBondToken?: {
    code: string
    address: string
  }
  contractorBondAmount?: string
  contractorBondToken?: {
    code: string
    address: string
  }
  checkerAmount?: string
  checkerToken?: {
    code: string
    address: string
  }
  /** @format date-time */
  metaUpdatedAt?: string
  meta?: {
    /** @default {} */
    content?: {
      text: string
      md5: string
    }
    /** @default [] */
    files?: {
      url: string
      md5: string
      name: string
      /** @format float */
      size: number
      encrypted: boolean
    }[]
  }
  /** @format date-time */
  resultUpdatedAt?: string
  result?: {
    /** @default {} */
    content?: {
      text: string
      md5: string
    }
    /** @default [] */
    files?: {
      url: string
      md5: string
      name: string
      /** @format float */
      size: number
      encrypted: boolean
    }[]
  }
}[]

export interface Deal {
  id: string
  blockchain: string
  /** @default "NONE" */
  performanceBondType: 'ONLY_CLIENT' | 'ONLY_EXECUTOR' | 'BOTH' | 'NONE'
  /** @default "NONE" */
  completionCheckType: 'CHECKER' | 'NONE'
  /** @format date-time */
  createdAt: string
  /** @format date-time */
  updatedAt?: string
  /** @format date-time */
  endedAt?: string
  /** @format date-time */
  deadline: string
  token?: {
    code: string
    address: string
  }
  amount: string
  amountFee: string
  ownerPublicKey: string
  contractorPublicKey?: string
  checkerPublicKey?: string
  /** @default "NEW" */
  status:
    | 'NEW'
    | 'STARTED'
    | 'STARTING'
    | 'FINISHED'
    | 'FINISHING'
    | 'CANCELED'
    | 'CANCELING'
    | 'REVOKED'
  /** @default "CLIENT" */
  ownerRole: 'CLIENT' | 'EXECUTOR'
  encryptedSecretKey?: string
  secretKeyHash?: string
  sharedKey?: string
  ownerBondAmount?: string
  ownerBondToken?: {
    code: string
    address: string
  }
  contractorBondAmount?: string
  contractorBondToken?: {
    code: string
    address: string
  }
  checkerAmount?: string
  checkerToken?: {
    code: string
    address: string
  }
  /** @format date-time */
  metaUpdatedAt?: string
  meta?: {
    /** @default {} */
    content?: {
      text: string
      md5: string
    }
    /** @default [] */
    files?: {
      url: string
      md5: string
      name: string
      /** @format float */
      size: number
      encrypted: boolean
    }[]
  }
  /** @format date-time */
  resultUpdatedAt?: string
  result?: {
    /** @default {} */
    content?: {
      text: string
      md5: string
    }
    /** @default [] */
    files?: {
      url: string
      md5: string
      name: string
      /** @format float */
      size: number
      encrypted: boolean
    }[]
  }
}

export interface CreateDeal {
  role: 'CLIENT' | 'EXECUTOR'
  /** @default "NONE" */
  performanceBondType: 'ONLY_CLIENT' | 'ONLY_EXECUTOR' | 'BOTH' | 'NONE'
  /** @default "NONE" */
  completionCheckType: 'CHECKER' | 'NONE'
  /** Contractor public key */
  contractorPublicKey?: string
  /** Checker public key */
  checkerPublicKey?: string
  /** @format date-time */
  deadline?: string
  /** Encrypted secret key for encrypt files, generated on client and encrypt by private key. Allow only with secretKeyHash, sharedKey */
  encryptedSecretKey?: string
  /** Secret key SHA-3 hash. Allow only with encryptedSecretKey, sharedKey */
  secretKeyHash?: string
  /** Base64 string, part of secret key. Shamir Algorithm. Allow only with secretKeyHash, encryptedSecretKey */
  sharedKey?: string
}

export interface UpdateDeal {
  amount?: {
    /** @pattern ^[0-9]+$ */
    value: string
    token?: {
      code: string
      address: string
    }
  }
  checkerAmount?: {
    /** @pattern ^[0-9]+$ */
    value: string
    token?: {
      code: string
      address: string
    }
  }
  ownerBondAmount?: {
    /** @pattern ^[0-9]+$ */
    value: string
    token?: {
      code: string
      address: string
    }
  }
  contractorBondAmount?: {
    /** @pattern ^[0-9]+$ */
    value: string
    token?: {
      code: string
      address: string
    }
  }
  /** @format date-time */
  deadline?: string
  allowHolderMode?: boolean
}

export interface DealActions {
  signed?: boolean
  actions: 'SIGN' | 'CANCEL' | 'FINISH' | 'CANCEL_SIGN'
}

export interface DealFee {
  /** @format float */
  fee: number
  feeAmount: {
    /** @pattern ^[0-9]+$ */
    value: string
    token?: {
      code: string
      address: string
    }
  }
  /** @format float */
  percent: number
  /** @format float */
  fiatFee: number
  isMinimum: boolean
  /** @default "USD" */
  fiatCurrency: 'USD'
}

export interface DealParticipate {
  /** Set contract partner */
  type: 'CONTRACTOR' | 'CHECKER'
  publicKey: string
  blockchain?: 'solana' | 'bsc'
  secretKeyHash?: string
}

export interface Meta {
  /** @default {} */
  content?: {
    text: string
    md5: string
  }
  /** @default [] */
  files?: {
    url: string
    md5: string
    name: string
    /** @format float */
    size: number
    encrypted: boolean
  }[]
}

export interface TxUpdate {
  /** Base64 signed transaction */
  transaction: string
  /** Base64 string signature */
  signature: string
}

export interface Tx {
  id: string
  type:
    | 'DEAL_INIT'
    | 'DEAL_FINISH'
    | 'DEAL_CANCELED'
    | 'WRAP_SOL'
    | 'UNWRAP_ALL_SOL'
    | 'TRANSFER'
    | 'WRAP'
    | 'UNWRAP'
  status: 'NEW' | 'IN_PROCESSING' | 'ERROR' | 'FINISHED'
  wrapAmount?: string
  dealId?: string
  /** @format date-time */
  createdAt: string
  /** @default false */
  ownerSigned?: boolean
  /** @default false */
  contractorSigned?: boolean
  transaction?: string
  /** Base64 string */
  signature?: string
  /** @format date-time */
  sendedAt?: string
}

export type TxList = {
  id: string
  type:
    | 'DEAL_INIT'
    | 'DEAL_FINISH'
    | 'DEAL_CANCELED'
    | 'WRAP_SOL'
    | 'UNWRAP_ALL_SOL'
    | 'TRANSFER'
    | 'WRAP'
    | 'UNWRAP'
  status: 'NEW' | 'IN_PROCESSING' | 'ERROR' | 'FINISHED'
  wrapAmount?: string
  dealId?: string
  /** @format date-time */
  createdAt: string
  /** @default false */
  ownerSigned?: boolean
  /** @default false */
  contractorSigned?: boolean
  transaction?: string
  /** Base64 string */
  signature?: string
  /** @format date-time */
  sendedAt?: string
}[]

export interface Auth {
  message: string
  verified: boolean
  identifier: string
  /** @format date-time */
  expiredAt?: string
}

export interface AvailableMethods {
  methods?: ('nowpayments' | 'advcash')[]
}

export interface Payment {
  type: string
  paymentUrl?: string
  successUrl?: string
  failUrl?: string
  method?: string
  params?: object
}

export interface Calculate {
  prices?: object
  fiatCurrency?: string
  /** @format float */
  tokenAmount?: number
  /** @format float */
  tokenPrice?: number
}

export type AiPrompts = {
  text: string
  tags?: string
}[]

export interface AiResult {
  generated: string
}

export interface UploadedFile {
  md5: string
  url: string
}

export interface Referral {
  promocode?: string
  referrerCode?: string
  prizes?: {
    type?: string
    amount?: {
      /** @pattern ^[0-9]+$ */
      value: string
      token?: {
        code: string
        address: string
      }
    }
    price?: {
      /** @pattern ^[0-9]+$ */
      value: string
      token?: {
        code: string
        address: string
      }
    }
    /** @format float */
    count?: number
    applied?: boolean
    description?: string
    accounts?: {
      publicKey: string
      blockchain: string
      /** @format date-time */
      createdAt?: string
    }[]
    allowViewAccounts?: boolean
  }[]
  allowApply?: boolean
}

export interface ReferralApplyCode {
  status: 'NEW' | 'IN_PROCESSING' | 'ERROR' | 'FINISHED'
}

export type Tokens = {
  /** SOL, USDC, etc... */
  code: string
  /** Solana, etc... */
  name: string
  address: string
  decimals: number
  holderMode?: boolean
  logoURL?: string
}[]

import type {
  AxiosInstance,
  AxiosRequestConfig,
  HeadersDefaults,
  ResponseType
} from 'axios'
import axios from 'axios'

export type QueryParamsType = Record<string | number, any>

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, 'data' | 'params' | 'url' | 'responseType'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean
  /** request path */
  path: string
  /** content type of request body */
  type?: ContentType
  /** query params */
  query?: QueryParamsType
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType
  /** request body */
  body?: unknown
}

export type RequestParams = Omit<
  FullRequestParams,
  'body' | 'method' | 'query' | 'path'
>

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, 'data' | 'cancelToken'> {
  securityWorker?: (
    securityData: SecurityDataType | null
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void
  secure?: boolean
  format?: ResponseType
}

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain'
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance
  private securityData: SecurityDataType | null = null
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker']
  private secure?: boolean
  private format?: ResponseType

  constructor(
    {
      securityWorker,
      secure,
      format,
      ...axiosConfig
    }: ApiConfig<SecurityDataType> = {}
  ) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || 'https://dev.contractus.tech/api/v1'
    })
    this.secure = secure
    this.format = format
    this.securityWorker = securityWorker
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data
  }

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method)

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {})
      }
    }
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === 'object' && formItem !== null) {
      return JSON.stringify(formItem)
    } else {
      return `${formItem}`
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key]
      const propertyContent: any[] =
        property instanceof Array ? property : [property]

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem)
        )
      }

      return formData
    }, new FormData())
  }

  public request = async <T = any, _E = any>(
    { secure, path, type, query, format, body, ...params }: FullRequestParams
  ): Promise<T> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {}
    const requestParams = this.mergeRequestParams(params, secureParams)
    const responseFormat = format || this.format || undefined

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === 'object'
    ) {
      body = this.createFormData(body as Record<string, unknown>)
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== 'string'
    ) {
      body = JSON.stringify(body)
    }

    return this.instance
      .request({
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { 'Content-Type': type }
            : {})
        },
        params: query,
        responseType: responseFormat,
        data: body,
        url: path
      })
      .then(response => response.data)
  }
}

/**
 * @title Contractus API
 * @version 0.1.1
 * @baseUrl https://dev.contractus.tech/api/v1
 *
 * The REST API for Contractus service
 */
export class ContractusAPI<
  SecurityDataType extends unknown
> extends HttpClient<SecurityDataType> {
  auth = {
    /**
     * No description
     *
     * @tags Auth
     * @name VerifyDeviceCreate
     * @summary Get message for device
     * @request POST:/auth/verify-device
     * @secure
     */
    verifyDeviceCreate: (
      data: {
        deviceToken: string
        identifier: string
        type:
          | 'IOS'
          | 'ANDROID_GOOGLE'
          | 'ANDROID_HUAWEI'
          | 'ANDROID_UNKNOWN'
          | 'BROWSER'
          | 'SERVICE'
      },
      params: RequestParams = {}
    ) =>
      this.request<Auth, Error>({
        path: `/auth/verify-device`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      })
  }
  accounts = {
    /**
     * No description
     *
     * @tags Account
     * @name AccountsList
     * @summary Search public accounts
     * @request GET:/accounts
     * @secure
     */
    accountsList: (
      query?: {
        skip?: number
        take?: number
        q?: string
      },
      params: RequestParams = {}
    ) =>
      this.request<AccountList, Error>({
        path: `/accounts`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Account
     * @name GetAccounts
     * @summary Get current profile
     * @request GET:/accounts/my
     * @secure
     */
    getAccounts: (params: RequestParams = {}) =>
      this.request<Account, Error>({
        path: `/accounts/my`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Account
     * @name TopupCreate
     * @summary Get topUp methods
     * @request POST:/accounts/topup
     * @secure
     */
    topupCreate: (params: RequestParams = {}) =>
      this.request<Topup, Error>({
        path: `/accounts/topup`,
        method: 'POST',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Account
     * @name LoanCreate
     * @summary Get loan methods
     * @request POST:/accounts/loan
     * @secure
     */
    loanCreate: (params: RequestParams = {}) =>
      this.request<Topup, Error>({
        path: `/accounts/loan`,
        method: 'POST',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Account
     * @name BalanceCreate
     * @summary Get account tokens balances
     * @request POST:/accounts/balance
     * @secure
     */
    balanceCreate: (
      data: {
        tokens?: {
          code: string
          address?: string | null
        }[]
        currency: 'USD'
      },
      params: RequestParams = {}
    ) =>
      this.request<Balance, Error>({
        path: `/accounts/balance`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Account
     * @name StatisticsList
     * @summary Get current profile statistics
     * @request GET:/accounts/statistics
     * @secure
     */
    statisticsList: (params: RequestParams = {}) =>
      this.request<Statistics, Error>({
        path: `/accounts/statistics`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      })
  }
  referrals = {
    /**
     * No description
     *
     * @tags Referrals
     * @name ReferralsList
     * @summary Get referral details
     * @request GET:/referrals
     * @secure
     */
    referralsList: (params: RequestParams = {}) =>
      this.request<Referral, Error>({
        path: `/referrals`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Referrals
     * @name ReferralsCreate
     * @summary Create promocode if not exist
     * @request POST:/referrals
     * @secure
     */
    referralsCreate: (data: any, params: RequestParams = {}) =>
      this.request<Referral, Error>({
        path: `/referrals`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Referrals
     * @name ApplyCreate
     * @summary Apply promo code
     * @request POST:/referrals/apply
     * @secure
     */
    applyCreate: (
      data: {
        promocode: string
      },
      params: RequestParams = {}
    ) =>
      this.request<ReferralApplyCode, Error>({
        path: `/referrals/apply`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      })
  }
  deals = {
    /**
     * No description
     *
     * @tags Deals
     * @name DealsList
     * @summary Retrieve the list with all of the deals
     * @request GET:/deals
     * @secure
     */
    dealsList: (
      query?: {
        skip?: number
        take?: number
        /** @example ["CHECKER","CLIENT","EXECUTOR"] */
        'types[]'?: string[]
        /** @example ["NEW","STARTED","STARTING","FINISHED","FINISHING","CANCELED","CANCELING","REVOKED"] */
        'statuses[]'?: string[]
      },
      params: RequestParams = {}
    ) =>
      this.request<Deals, Error>({
        path: `/deals`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Deals
     * @name DealsCreate
     * @summary Create new deal
     * @request POST:/deals
     * @secure
     */
    dealsCreate: (
      data: {
        role: 'CLIENT' | 'EXECUTOR'
        /** @default "NONE" */
        performanceBondType: 'ONLY_CLIENT' | 'ONLY_EXECUTOR' | 'BOTH' | 'NONE'
        /** @default "NONE" */
        completionCheckType: 'CHECKER' | 'NONE'
        /** Contractor public key */
        contractorPublicKey?: string
        /** Checker public key */
        checkerPublicKey?: string
        /** @format date-time */
        deadline?: string
        /** Encrypted secret key for encrypt files, generated on client and encrypt by private key. Allow only with secretKeyHash, sharedKey */
        encryptedSecretKey?: string
        /** Secret key SHA-3 hash. Allow only with encryptedSecretKey, sharedKey */
        secretKeyHash?: string
        /** Base64 string, part of secret key. Shamir Algorithm. Allow only with secretKeyHash, encryptedSecretKey */
        sharedKey?: string
      },
      params: RequestParams = {}
    ) =>
      this.request<CreateDeal, Error>({
        path: `/deals`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Deals
     * @name DealsDetail
     * @summary Get deal by id
     * @request GET:/deals/{id}
     * @secure
     */
    dealsDetail: (id: string, params: RequestParams = {}) =>
      this.request<Deal, Error>({
        path: `/deals/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Deals
     * @name DealsCreate2
     * @summary Update deal
     * @request POST:/deals/{id}
     * @originalName dealsCreate
     * @duplicate
     * @secure
     */
    dealsCreate2: (
      id: string,
      data: {
        amount?: {
          /** @pattern ^[0-9]+$ */
          value: string
          token?: {
            code: string
            address: string
          }
        }
        checkerAmount?: {
          /** @pattern ^[0-9]+$ */
          value: string
          token?: {
            code: string
            address: string
          }
        }
        ownerBondAmount?: {
          /** @pattern ^[0-9]+$ */
          value: string
          token?: {
            code: string
            address: string
          }
        }
        contractorBondAmount?: {
          /** @pattern ^[0-9]+$ */
          value: string
          token?: {
            code: string
            address: string
          }
        }
        /** @format date-time */
        deadline?: string
        allowHolderMode?: boolean
      },
      params: RequestParams = {}
    ) =>
      this.request<Deal, Error>({
        path: `/deals/${id}`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Deals
     * @name ActionsDetail
     * @summary Get deal actions
     * @request GET:/deals/{id}/actions
     * @secure
     */
    actionsDetail: (id: string, params: RequestParams = {}) =>
      this.request<DealActions, Error>({
        path: `/deals/${id}/actions`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Deals
     * @name PostDeals
     * @summary Get fee for deal
     * @request POST:/deals/{id}/fee
     * @secure
     */
    postDeals: (
      id: string,
      data: {
        amount?: {
          /** @pattern ^[0-9]+$ */
          value: string
          token?: {
            code: string
            address: string
          }
        }
        type: 'DEAL' | 'CHECKER'
        /** @default "USD" */
        currency?: 'USD'
        /** @default false */
        allowHolderMode?: boolean
      },
      params: RequestParams = {}
    ) =>
      this.request<DealFee, Error>({
        path: `/deals/${id}/fee`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Deals
     * @name CancelCreate
     * @summary Cancel transaction. If the deal is in progress, you need to send force=true and then the funds from the contract will be returned
     * @request POST:/deals/{id}/cancel
     * @secure
     */
    cancelCreate: (
      id: string,
      query: {
        force: boolean
      },
      params: RequestParams = {}
    ) =>
      this.request<Deal, Error>({
        path: `/deals/${id}/cancel`,
        method: 'POST',
        query: query,
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Deals
     * @name ParticipateCreate
     * @summary Participate to deal
     * @request POST:/deals/{id}/participate
     * @secure
     */
    participateCreate: (id: string, params: RequestParams = {}) =>
      this.request<DealParticipate, Error>({
        path: `/deals/${id}/participate`,
        method: 'POST',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Deals
     * @name ParticipateDelete
     * @summary Delete contractor from deal
     * @request DELETE:/deals/{id}/participate
     * @secure
     */
    participateDelete: (id: string, params: RequestParams = {}) =>
      this.request<Id, Error>({
        path: `/deals/${id}/participate`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Deals
     * @name MetaCreate
     * @summary Update metadata for deal
     * @request POST:/deals/{id}/meta
     * @secure
     */
    metaCreate: (
      id: string,
      data: {
        /** @format date-time */
        updatedAt: string
        /** @default false */
        force?: boolean
        meta?: {
          /** @default {} */
          content?: {
            text: string
            md5: string
          }
          /** @default [] */
          files?: {
            url: string
            md5: string
            name: string
            /** @format float */
            size: number
            encrypted: boolean
          }[]
        }
      },
      params: RequestParams = {}
    ) =>
      this.request<Meta, Error>({
        path: `/deals/${id}/meta`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Deals
     * @name ResultsCreate
     * @summary Update results for deal (only for executor)
     * @request POST:/deals/{id}/results
     * @secure
     */
    resultsCreate: (
      id: string,
      data: {
        /** @format date-time */
        updatedAt: string
        /** @default false */
        force?: boolean
        result?: {
          /** @default {} */
          content?: {
            text: string
            md5: string
          }
          /** @default [] */
          files?: {
            url: string
            md5: string
            name: string
            /** @format float */
            size: number
            encrypted: boolean
          }[]
        }
      },
      params: RequestParams = {}
    ) =>
      this.request<Meta, Error>({
        path: `/deals/${id}/results`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Deals
     * @name GetDeals
     * @summary Get all transactions
     * @request GET:/deals/{id}/tx
     * @secure
     */
    getDeals: (id: string, params: RequestParams = {}) =>
      this.request<Tx, Error>({
        path: `/deals/${id}/tx`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Deals
     * @name GetDeals2
     * @summary Get transaction.
     * @request GET:/deals/{id}/tx/{type}
     * @originalName getDeals
     * @duplicate
     * @secure
     */
    getDeals2: (id: string, type: string, params: RequestParams = {}) =>
      this.request<Tx, Error>({
        path: `/deals/${id}/tx/${type}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Deals
     * @name TxSignCreate
     * @summary Sign strasaction (only after owner)
     * @request POST:/deals/{id}/tx/{type}/sign
     * @secure
     */
    txSignCreate: (id: string, type: string, params: RequestParams = {}) =>
      this.request<TxUpdate, Error>({
        path: `/deals/${id}/tx/${type}/sign`,
        method: 'POST',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Deals
     * @name TxSignDelete
     * @summary Cancel sign
     * @request DELETE:/deals/{id}/tx/{type}/sign
     * @secure
     */
    txSignDelete: (id: string, type: string, params: RequestParams = {}) =>
      this.request<Success, Error>({
        path: `/deals/${id}/tx/${type}/sign`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params
      })
  }
  tx = {
    /**
     * No description
     *
     * @tags Transactions
     * @name GetTx
     * @summary Retrieve the list of transactions
     * @request GET:/tx
     * @secure
     */
    getTx: (
      query?: {
        dealId?: string
        skip?: number
        take?: number
        /** @example ["DEAL_INIT","DEAL_FINISH","DEAL_CANCELED","WRAP_SOL","UNWRAP_ALL_SOL","TRANSFER","WRAP","UNWRAP"] */
        'types[]'?: string[]
        /** @example ["NEW","IN_PROCESSING","ERROR","FINISHED"] */
        'statuses[]'?: string[]
      },
      params: RequestParams = {}
    ) =>
      this.request<TxList, Error>({
        path: `/tx`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Transactions
     * @name GetTx2
     * @summary Get transaction by id
     * @request GET:/tx/{id}
     * @originalName getTx
     * @duplicate
     * @secure
     */
    getTx2: (id: string, params: RequestParams = {}) =>
      this.request<Tx, Error>({
        path: `/tx/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Transactions
     * @name DeleteTx
     * @summary Delete transaction
     * @request DELETE:/tx/{id}
     * @secure
     */
    deleteTx: (id: string, params: RequestParams = {}) =>
      this.request<Success, Error>({
        path: `/tx/${id}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Transactions
     * @name WrapCreate
     * @summary Wrap crypto corrency. Example: SOL -> WSOL
     * @request POST:/tx/wrap
     * @secure
     */
    wrapCreate: (data: any, params: RequestParams = {}) =>
      this.request<Tx, Error>({
        path: `/tx/wrap`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Transactions
     * @name WrapSignCreate
     * @summary Send signed transaction for wrap
     * @request POST:/tx/wrap/sign
     * @secure
     */
    wrapSignCreate: (
      data: {
        id: string
        /** Base64 signed transaction */
        transaction: string
        /** Base64 string signature */
        signature: string
      },
      params: RequestParams = {}
    ) =>
      this.request<Tx, Error>({
        path: `/tx/wrap/sign`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Transactions
     * @name UnwrapAllCreate
     * @summary Unwrap all wSOL to SOL
     * @request POST:/tx/unwrap-all/
     * @secure
     */
    unwrapAllCreate: (params: RequestParams = {}) =>
      this.request<Tx, Error>({
        path: `/tx/unwrap-all/`,
        method: 'POST',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Transactions
     * @name TransferCreate
     * @summary Get transaction for sign
     * @request POST:/tx/transfer
     * @secure
     */
    transferCreate: (
      data: {
        /** @pattern ^[0-9]+$ */
        value: string
        token?: {
          code: string
          address?: string | null
        }
        recipient?: string
      },
      params: RequestParams = {}
    ) =>
      this.request<Tx, Error>({
        path: `/tx/transfer`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Transactions
     * @name TransferSignCreate
     * @summary Send signed transfer transaction
     * @request POST:/tx/transfer/sign
     * @secure
     */
    transferSignCreate: (
      data: {
        id: string
        /** Base64 signed transaction */
        transaction: string
        /** Base64 string signature */
        signature: string
      },
      params: RequestParams = {}
    ) =>
      this.request<Tx, Error>({
        path: `/tx/transfer/sign`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Transactions
     * @name ApprovalDetail
     * @summary Get approval unsigned TX (only EVM)
     * @request GET:/tx/approval/{address}
     * @secure
     */
    approvalDetail: (address: string, params: RequestParams = {}) =>
      this.request<
        {
          rawTransaction?: {
            data: string
            /** @format float */
            gasLimit: number
            /** @format float */
            chainId: number
            /** @format float */
            type: number
            /** @format float */
            nonce: number
            to: string
            maxPriorityFeePerGas: string
            maxFeePerGas: string
          }
          needApproval: boolean
        },
        Error
      >({
        path: `/tx/approval/${address}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Transactions
     * @name SendCreate
     * @summary Send signed tx (only EVM)
     * @request POST:/tx/send
     * @secure
     */
    sendCreate: (
      data: {
        rawTransaction: {
          data: string
          /** @format float */
          gasLimit: number
          /** @format float */
          chainId: number
          /** @format float */
          type: number
          /** @format float */
          nonce: number
          to: string
          maxPriorityFeePerGas: string
          maxFeePerGas: string
        }
        signature: string
      },
      params: RequestParams = {}
    ) =>
      this.request<void, Error>({
        path: `/tx/send`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      })
  }
  files = {
    /**
     * No description
     *
     * @tags Files
     * @name UploadCreate
     * @summary Upload file
     * @request POST:/files/upload
     * @secure
     */
    uploadCreate: (
      data: {
        /** MD5 hash uploading file */
        md5: string
        /** @format binary */
        file: File
      },
      params: RequestParams = {}
    ) =>
      this.request<UploadedFile, Error>({
        path: `/files/upload`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: 'json',
        ...params
      })
  }
  resources = {
    /**
     * No description
     *
     * @tags Resources
     * @name TokensList
     * @summary Token list
     * @request GET:/resources/tokens
     * @secure
     */
    tokensList: (
      query?: {
        type?: string
        q?: string
      },
      params: RequestParams = {}
    ) =>
      this.request<Tokens, Error>({
        path: `/resources/tokens`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params
      })
  }
  checkout = {
    /**
     * No description
     *
     * @tags Checkout
     * @name AvailableList
     * @summary Get available chckout methods for client by IP
     * @request GET:/checkout/available
     * @secure
     */
    availableList: (params: RequestParams = {}) =>
      this.request<AvailableMethods, Error>({
        path: `/checkout/available`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Checkout
     * @name CalculateCreate
     * @summary Calculate price
     * @request POST:/checkout/calculate
     * @secure
     */
    calculateCreate: (
      data: {
        /**
         * Get prices with currencies
         * @default []
         */
        currencies?: (
          | 'BNB'
          | 'SOL'
          | 'WSOL'
          | 'USDC'
          | 'CTUS'
          | 'SRM'
          | 'STEP'
          | 'LOOT'
          | 'LIKE'
          | 'ART'
          | 'USDT'
          | 'WLKN'
          | 'GYC'
          | 'SAIL'
          | 'KIN'
          | 'NEON'
          | 'DCD'
          | 'BREAD'
          | 'BTC'
          | 'ETH'
        )[]
        /**
         * Amount CTUS token
         * @format float
         */
        amount: number
      },
      params: RequestParams = {}
    ) =>
      this.request<Calculate, Error>({
        path: `/checkout/calculate`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Checkout
     * @name CreateCreate
     * @summary Create payment url
     * @request POST:/checkout/create
     * @secure
     */
    createCreate: (
      data: {
        /**
         * Amount CTUS token
         * @format float
         * @min 1000
         */
        amount: number
        /** Blockchain, supported: solana */
        blockchain?: string
        /** Public key of blockchain */
        publicKey?: string
        /** @default "nowpayments" */
        type?: 'nowpayments' | 'advcash'
      },
      params: RequestParams = {}
    ) =>
      this.request<Payment, Error>({
        path: `/checkout/create`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      })
  }
  ai = {
    /**
     * No description
     *
     * @tags AI
     * @name GenerateTextCreate
     * @summary Generate text
     * @request POST:/ai/generate-text
     * @secure
     */
    generateTextCreate: (
      data: {
        q?: string | null
      },
      params: RequestParams = {}
    ) =>
      this.request<AiResult, Error>({
        path: `/ai/generate-text`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags AI
     * @name PromptsList
     * @summary Get prompts
     * @request GET:/ai/prompts
     * @secure
     */
    promptsList: (
      query?: {
        q?: string
      },
      params: RequestParams = {}
    ) =>
      this.request<AiPrompts, Error>({
        path: `/ai/prompts`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params
      })
  }
  healthCheck = {
    /**
     * No description
     *
     * @tags Health Check
     * @name HealthCheckList
     * @summary Health Check
     * @request GET:/health-check
     * @secure
     */
    healthCheckList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/health-check`,
        method: 'GET',
        secure: true,
        ...params
      })
  }
}
