GO

/****** Object:  StoredProcedure [dbo].[sp_Get_CR_Remarks_Details_For_Select_Edit]
 -----------Created By Ajay Bind-------------------
 Script Date: 30-Apr-20 7:29:30 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_Get_CR_Remarks_Details_For_Select_Edit]
@WhereQuery VARCHAR(MAX)=''

AS BEGIN
DECLARE @STRSQL VARCHAR(MAX)
--default option--
SET @STRSQL = 'SELECT * FROM tbl_cr_remark_details ORDER BY CR_Remark_ID DESC';
IF(@WhereQuery IS NOT NULL AND @WhereQuery <>'')
BEGIN
	SET @STRSQL ='SELECT * FROM tbl_cr_remark_details WHERE ('+@WhereQuery+') ORDER BY CR_Remark_ID DESC';
END

PRINT(@STRSQL)
EXEC(@STRSQL)
END
GO


