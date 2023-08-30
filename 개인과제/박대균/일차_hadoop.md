test2010 = pd.read_csv('C:/Users/SSAFY/Desktop/code/t2020.csv')

name_split = test2010["시군구"].str.split(" ")
test2010["trash"] = name_split.str.get(0)
test2010["use"] = name_split.str.get(1)

test2010["거래금액(만원)"] = test2010["거래금액(만원)"].str.replace(',','')
test2010["거래금액(만원)"] = test2010["거래금액(만원)"].astype('int64')

test2010["useNum"] = test2010["거래금액(만원)"]/test2010["전용면적(㎡)"]

merge_outer =test2010.groupby('use').mean()[["useNum"]]
#####################################################################
path_dir = 'C:/Users/SSAFY/Desktop/najibmaryen'
 
file_list = os.listdir(path_dir)
#print(len(file_list))

for file_name in file_list:
    file_path = os.path.join(path_dir, file_name)
    test = pd.read_csv(file_path)
    
    name_split = test["시군구"].str.split(" ")
    test["trash"] = name_split.str.get(0)
    test["use"] = name_split.str.get(1)
    
    test["거래금액(만원)"] = test["거래금액(만원)"].str.replace(',','')
    test["거래금액(만원)"] = test["거래금액(만원)"].astype('int64')
    test["useNum"] = test["거래금액(만원)"]/test2010["전용면적(㎡)"]
                                               
    test_group =test.groupby('use').mean()[["useNum"]]
    test_group = test_group.rename(columns={'useNum':file_name})
    merge_outer = pd.merge(merge_outer,test_group, how='outer',on='use')
    
    print(file_name)
merge_outer.drop(labels="useNum", axis=1, inplace = True)
