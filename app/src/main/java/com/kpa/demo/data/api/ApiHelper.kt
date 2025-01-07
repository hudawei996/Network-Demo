package com.kpa.demo.data.api

import com.kpa.demo.data.http.NetWorkHelper

/**
 *    author : kpa
 *    e-mail : billkp@yeah.net
 */
class ApiHelper(private val apiService: ApiService = NetWorkHelper.apiService) {
    suspend fun getGirls(page: Int = 1) = apiService.getGirls(page)
    suspend fun getString() = apiService.getString()
}