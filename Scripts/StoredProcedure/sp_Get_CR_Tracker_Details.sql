
GO

/****** Object:  StoredProcedure [dbo].[sp_Get_CR_Tracker_Details]
-----Common Script of Deepak & Ajay--------
Script Date: 30-Apr-20 7:30:42 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[sp_Get_CR_Tracker_Details]
@WhereQuery VARCHAR(MAX)=''

AS BEGIN
DECLARE @STRSQL VARCHAR(MAX)
SET @STRSQL = 'SELECT * FROM CRDetails ORDER BY CR_ID DESC';
 
IF(@WhereQuery IS NOT NULL AND @WhereQuery <>'')
BEGIN
 SET @STRSQL = 'SELECT * FROM CRDetails WHERE ('+@WhereQuery+') ORDER BY CR_ID DESC';
END
PRINT(@STRSQL)
EXEC(@STRSQL)
END


--sp_Get_CR_Tracker_Details 'CR_Status = ''UAT'''

GO


