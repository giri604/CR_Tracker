GO

/****** Object:  StoredProcedure [dbo].[sp_Get_Six_Month_Chart_CR_Details]    
 -----------Created By Ajay Bind-------------------
Script Date: 30-Apr-20 7:32:02 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[sp_Get_Six_Month_Chart_CR_Details]
@WhereQuery VARCHAR(MAX)=''

AS BEGIN
DECLARE @STRSQL VARCHAR(MAX)
SET @STRSQL = 'SELECT ProjectCRReceivedDate, CR_Status FROM CRDetails WHERE (ProjectCRReceivedDate > dateadd(m, -6, getdate() - datepart(d, getdate()) + 1))';
 
IF(@WhereQuery IS NOT NULL AND @WhereQuery <>'')
BEGIN
 SET @STRSQL = 'SELECT ProjectCRReceivedDate, CR_Status FROM CRDetails WHERE (ProjectCRReceivedDate > dateadd(m, -6, getdate() - datepart(d, getdate()) + 1)) AND ('+@WhereQuery+')';
END
PRINT(@STRSQL)
EXEC(@STRSQL)
END






GO


