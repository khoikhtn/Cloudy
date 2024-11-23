import { current } from "@reduxjs/toolkit"

export const updatedName = (name) => ({
    type: 'UPDATEDNAME',
    nameUser:  name
})

export const updatedEmail = (email) => ({
    type: 'UPDATEDEMAIL',
    emailUser: email
})

export const updatedImage = (image) => ({
    type: 'UPDATEDIMAGE',
    imageUser: image
})

export const updatedPassword = (pass) => ({
    type : 'UPDATEDPASSWORD',
    passUser: pass
})

export const updatedCurrentAccount = (currentAccount) => ({
    type: 'UPDATEDCURRENTACCOUNT',
    account: currentAccount    
})

export const updatedFavor = (list) => ({
    type: 'UPDATEDFAVOR',
    favor: list
})

export const deletedFavor = (list) => ({
    type: 'DELETEDFAVOR',
    favor: list
})

export const updatedAddPack = (list) => ({
    type: 'UPDATEDADDPACK',
    pack: list
})

export const updatedScreen = (list) => ({
    type: 'UPDATEDSCREEN',
    screen: list
})

export const deletePackScreen = (list) => ({
    type: 'DELETEPACKSCREEN',
    screen: list
})

export const deletePack = (list) => ({
    type:  'DELETEPACK',
    pack: list
})

export const addCustomPackage = (packs) => ({
    type: 'ADDCUSTOMPACKAGE',
    favor: packs
})

export const clearCustonPackage = () => ({
    type: "CLEARCUSTOMPACKAGE",
    favor: []
})

export const removeCustomPackage = (item) => ({
    type: "REMOVECUSTOMPACKAGE",
    favor: item
})

export const updateCustomItem = (item) => ({
    type: 'UPDATEDCUSTOMITEM',
    item: item,
})

export const deleteCustomItem = (item) => ({
    type: 'DELETECUSTOMITEM',
    item: item,
})