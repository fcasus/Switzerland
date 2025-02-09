// Copyright [2020] [Banana.ch SA - Lugano Switzerland]
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//


// @id = ch.banana.switzerland.pain001.test
// @api = 1.0
// @pubdate = 2022-01-17
// @publisher = Banana.ch SA
// @description = <TEST ch.banana.switzerland.pain001.js>
// @task = app.command
// @doctype = *.*
// @docproperties = 
// @outputformat = none
// @inputdataform = none
// @includejs = ../ch.banana.switzerland.pain001.sbaa/ch.banana.switzerland.pain001.js
// @timeout = -1


/*

  SUMMARY
  -------
  Javascript test
  1. Open the .ac2 file
  2. Execute the .js script
  3. Save the report



  virtual void addTestBegin(const QString& key, const QString& comment = QString());
  virtual void addTestEnd();

  virtual void addSection(const QString& key);
  virtual void addSubSection(const QString& key);
  virtual void addSubSubSection(const QString& key);

  virtual void addComment(const QString& comment);
  virtual void addInfo(const QString& key, const QString& value1, const QString& value2 = QString(), const QString& value3 = QString());
  virtual void addFatalError(const QString& error);
  virtual void addKeyValue(const QString& key, const QString& value, const QString& comment = QString());
  virtual void addReport(const QString& key, QJSValue report, const QString& comment = QString());
  virtual void addTable(const QString& key, QJSValue table, QStringList colXmlNames = QStringList(), const QString& comment = QString());

**/

// Register test case to be executed
Test.registerTestCase(new Pain001CHTest());

// Here we define the class, the name of the class is not important
function Pain001CHTest() {

}

// This method will be called at the beginning of the test case
Pain001CHTest.prototype.initTestCase = function () {

    this.testLogger = Test.logger;
    this.progressBar = Banana.application.progressBar;

    this.fileNameList = [];
    this.fileNameList.push("file:script/../test/testcases/payments_2022.ac2");

}

// This method will be called at the end of the test case
Pain001CHTest.prototype.cleanupTestCase = function () {

}

// This method will be called before every test method is executed
Pain001CHTest.prototype.init = function () {

}

// This method will be called after every test method is executed
Pain001CHTest.prototype.cleanup = function () {

}

//Test1
Pain001CHTest.prototype.test1 = function () {
    this.testLogger = Test.logger.newGroupLogger("ConvertPaymData");
    this.testLogger.addKeyValue("ConvertPaymDataTest", "ConvertPaymData");
    this.testLogger.addComment("Test the function convertPaymData() reading payment/data in Transactions table");
    this.startTest("convertPaymData");
    this.testLogger.close();
}

//Test2
/*Pain001CHTest.prototype.test2 = function () {
    this.testLogger = Test.logger.newGroupLogger("CreateTransferFile");
    this.testLogger.addKeyValue("CreateTransferFileTest", "CreateTransferFile");
    this.testLogger.addComment("Test the function createTransferFile() & validateTransferFile() reading payment/file in Transactions table");
    this.startTest("createTransferFile");
    this.testLogger.close();
}*/

//Test3
/*Pain001CHTest.prototype.test3 = function () {
    this.testLogger = Test.logger.newGroupLogger("UpdateRow");
    this.testLogger.addKeyValue("UpdateRowTest", "UpdateRow");
    this.testLogger.addComment("Test the function updateRow() reading payment/data in Transactions table");
    this.startTest("updateRow");
    this.testLogger.close();
}*/

//Test4
/*Pain001CHTest.prototype.test4 = function () {
    this.testLogger = Test.logger.newGroupLogger("ValidateParams");
    this.testLogger.addKeyValue("ValidateParamsTest", "ValidateParams");
    this.testLogger.addComment("Test the function validateParams() reading payment/data in Transactions table");
    this.startTest("validateParams");
    this.testLogger.close();
}*/

//Test the function CreateTransferFile() reading paymentFiles in Transactions table
Pain001CHTest.prototype.createTransferFile = function (banDocument, fileName) {
    var tableTransactions = banDocument.table('Transactions');
    if (!tableTransactions) {
        this.testLogger.addFatalError("Transaction table not valid " + fileName);
        return;
    }

    for (i = 0; i < tableTransactions.rowCount; i++) {
        var tRow = tableTransactions.row(i);
        var rowObj = null;
        var paymentObj = null;
        try {
            rowObj = JSON.parse(tRow.value("PaymentData"));
            paymentObj = JSON.parse(rowObj.paymentfile_json);
        }
        catch (e) {
            continue;
        }
		try {
			if (paymentObj["@type"] && paymentObj["@type"]=="payment/file") {
				var pain001 = new Pain001Switzerland(banDocument);
				var xml = pain001.createTransferFile(paymentObj);
				var jsonDoc = paymentObj["document"];
				var painFormat = "";
				if (jsonDoc["id"] && jsonDoc["id"]["painFormat"])
					painFormat = jsonDoc["id"]["painFormat"];
				var isValid = pain001.validateTransferFile(xml, '../' + painFormat);
				xml = xml.replace(/<CreDtTm>[\s\S]*?<\/CreDtTm>/, '<CreDtTm>' + '#currentDate' + '<\/CreDtTm>');				
				this.testLogger.addComment("---------------- CREATION of payment/file - transaction row " + i.toString() + " ----------------");
				this.testLogger.addXml("createTransferFile input", JSON.stringify(paymentObj, null, '   '));
				this.testLogger.addXml("createTransferFile output", xml);
				this.testLogger.addComment("---------------- VALIDATION of credit transfer file - transaction row " + i.toString() + " ----------------");
				this.testLogger.addKeyValue("validateTransferFile", isValid.toString());
			}
        } catch (e) {
            banDocument.addMessage(e);
        }			
    }
}

//Test the function convertPaymData() passing paymentData from table Transactions
Pain001CHTest.prototype.convertPaymData = function (banDocument, fileName) {
    var tableTransactions = banDocument.table('Transactions');
    if (!tableTransactions) {
        this.testLogger.addFatalError("Transaction table not valid " + fileName);
        return;
    }

    for (i = 0; i < tableTransactions.rowCount; i++) {
        var tRow = tableTransactions.row(i);
        var rowObj = null;
        var paymentObj = null;
        try {
            rowObj = JSON.parse(tRow.value("PaymentData"));
            paymentObj = JSON.parse(rowObj.paymentdata_json);
        }
        catch (e) {
            continue;
        }
		try {
			if (paymentObj["@type"] && paymentObj["@type"]=="payment/data") {
				var pain001 = new Pain001Switzerland(banDocument);
				var convertedParam = pain001.convertPaymData(paymentObj);
				this.testLogger.addComment("---------------- CONVERTPAYMDATA of payment/data - transaction row " + i.toString() + " ----------------");
				this.testLogger.addXml("convertPaymData input", JSON.stringify(paymentObj, null, '   '));
                for (var j = 0; j < convertedParam.data.length; j++) {
                    this.testLogger.addKeyValue(convertedParam.data[j].name, "value: " + convertedParam.data[j].value);
                }
			}
        } catch (e) {
            banDocument.addMessage(e);
        }			
    }
}

Pain001CHTest.prototype.startTest = function (functionName) {
    var parentLogger = this.testLogger;
    this.progressBar.start(this.fileNameList.length);
    for (var i = 0; i < this.fileNameList.length; i++) {
        var parentLogger = this.testLogger;
        var fileName = this.fileNameList[i];
        this.testLogger = parentLogger.newLogger(Banana.IO.fileCompleteBaseName(fileName));
        if (!this.progressBar.step(fileName))
            break;
        var banDocument = Banana.application.openDocument(fileName);
        if (banDocument) {
            this.testLogger.addInfo("FILENAME", fileName.toUpperCase());
			if (functionName=="createTransferFile")
				this.createTransferFile(banDocument, fileName);
			else if (functionName=="convertPaymData")
				this.convertPaymData(banDocument, fileName);
			else if (functionName=="updateRow")
				this.updateRow(banDocument, fileName);
			else if (functionName=="validateParams")
				this.validateParams(banDocument, fileName);
        }
        else {
            this.testLogger.addFatalError("File not found: " + fileName);
        }
        this.testLogger.close();
        this.testLogger = parentLogger;
    }
    this.progressBar.finish();
}

//Test the function updateRow() passing paymentData from table Transactions
Pain001CHTest.prototype.updateRow = function (banDocument, fileName) {
    var tableTransactions = banDocument.table('Transactions');
    if (!tableTransactions) {
        this.testLogger.addFatalError("Transaction table not valid " + fileName);
        return;
    }

    for (i = 0; i < tableTransactions.rowCount; i++) {
        var tRow = tableTransactions.row(i);
        var rowObj = null;
        var paymentObj = null;
        try {
            rowObj = JSON.parse(tRow.value("PaymentData"));
            paymentObj = JSON.parse(rowObj.paymentdata_json);
        }
        catch (e) {
            continue;
        }
		var tabPos = {};
		tabPos.columnName = "PaymentData";
		tabPos.listName = "Base";
		tabPos.rowNr = i.toString();
		tabPos.tableName = "Transactions";
		try {
			var jsAction = new JsAction(banDocument);
			var patch = jsAction.updateRow(tabPos);
			var tRow2 = tableTransactions.row(i);
			patch.creator.executionDate = "";
			patch.creator.executionTime = "";
			this.testLogger.addComment("---------------- UPDATEROW of payment/data - transaction row " + i.toString() + " ----------------");
			this.testLogger.addXml("updateRow output", JSON.stringify(patch, null, '   '));
        } catch (e) {
            banDocument.addMessage(e);
        }			
    }
}

//Test the function validateParams() passing paymentData from table Transactions
Pain001CHTest.prototype.validateParams = function (banDocument, fileName) {
    var tableTransactions = banDocument.table('Transactions');
    if (!tableTransactions) {
        this.testLogger.addFatalError("Transaction table not valid " + fileName);
        return;
    }

    for (i = 0; i < tableTransactions.rowCount; i++) {
        var tRow = tableTransactions.row(i);
        var rowObj = null;
        var paymentObj = null;
        try {
            rowObj = JSON.parse(tRow.value("PaymentData"));
            paymentObj = JSON.parse(rowObj.paymentdata_json);
        }
        catch (e) {
            continue;
        }
		try {
			if (paymentObj["@type"] && jsonObj["@type"]=="payment/data") {
				//ISR Test
				if (paymentObj.id.methodId == "ISR" && paymentObj.creditor && paymentObj.creditor.bankAccount)
                paymentObj.creditor.bankAccount = '';
				if (paymentObj.id.methodId == "ISR" && paymentObj.creditor && paymentObj.referenceNumber)
                paymentObj.referenceNumber = '';
				var pain001 = new Pain001Switzerland(banDocument);
				var convertedParam = pain001.convertPaymData(paymentObj, i);
				convertedParam.id = paymentObj.id;
				var validatedParam = pain001.validateParams(convertedParam);
				this.testLogger.addComment("---------------- VALIDATEPARAMS of payment/data - transaction row " + i.toString() + " ----------------");
				this.testLogger.addXml("validateParams input", JSON.stringify(paymentObj, null, '   '));
				for (var j = 0; j < convertedParam.data.length; j++) {
					this.testLogger.addKeyValue(paymentObj.id.methodId + " param " + convertedParam.data[j].name, "value: " + + convertedParam.data[j].value + " placeholder: " + convertedParam.data[j].placeholder);
				}
				for (var j = 0; j < validatedParam.data.length; j++) {
					if (validatedParam.data[j].errorId)
						this.testLogger.addKeyValue(paymentObj.id.methodId + " validated param " + validatedParam.data[j].name, "errorId: " + validatedParam.data[j].errorId + " errorMsg: " + validatedParam.data[j].errorMsg);
				}
			}
        } catch (e) {
            banDocument.addMessage(e);
        }			
    }
}