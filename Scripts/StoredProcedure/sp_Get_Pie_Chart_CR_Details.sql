GO

/****** Object:  StoredProcedure [dbo].[sp_Get_Pie_Chart_CR_Details]    
 -----------Created By Ajay Bind-------------------
Script Date: 30-Apr-20 7:31:28 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[sp_Get_Pie_Chart_CR_Details]
@WhereQuery VARCHAR(MAX)=''

AS BEGIN
DECLARE @STRSQL VARCHAR(MAX)
SET @STRSQL = 'SELECT CR_Status, COUNT(*) AS CR_Status_Count FROM CRDetails GROUP BY CR_Status';

IF(@WhereQuery IS NOT NULL AND @WhereQuery <>'')
BEGIN
 SET @STRSQL = 'SELECT CR_Status, COUNT(*) AS CR_Status_Count FROM CRDetails WHERE ('+@WhereQuery+') GROUP BY CR_Status';
END
PRINT(@STRSQL)
EXEC(@STRSQL)
END

GO


