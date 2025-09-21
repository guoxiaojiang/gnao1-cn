'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Brain, Dna, Stethoscope, FileText, Users, Heart } from 'lucide-react'

export default function AboutPage() {
  const sections = [
    {
      id: 'overview',
      title: '疾病概述',
      icon: Brain,
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">什么是GNAO1综合征？</h4>
            <p className="text-gray-600 leading-relaxed">
              GNAO1综合征是一种遗传性先天疾病，患儿会出现发育迟缓，并伴随癫痫发作和/或运动障碍。
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">其他名称</h4>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li><strong>发育性癫痫性脑病17型（DEE17）</strong>：部分患儿在幼年时会发展为严重的癫痫，对儿童的发育潜能产生重大影响</li>
              <li><strong>伴有不自主运动的神经发育障碍（NEDIM）</strong>：患儿发育速度较慢，可能出现无意识的不自主动作</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-2">谱系特征</h4>
            <p className="text-gray-600 leading-relaxed">
              GNAO1综合征的症状呈现高度异质性，可分为三大核心领域，但不同患儿的主导症状各异：
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
              <li><strong>癫痫</strong>：有些患儿以癫痫症状为主</li>
              <li><strong>运动障碍</strong>：有些患儿以肌张力障碍或舞蹈症为核心表现</li>
              <li><strong>发育迟缓/智力障碍</strong>：轻至重度不等</li>
            </ul>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-4">
              <p className="text-sm text-blue-800">
                <strong>关键点：</strong> 同一家庭中携带相同基因突变的患儿，症状严重度也可能差异显著。
                症状可能随年龄变化（例如：婴儿期癫痫突出，幼儿期转为运动障碍为主）。
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-2">发病率与患病人群</h4>
            <div className="space-y-2">
              <p className="text-gray-600"><strong>罕见痾病</strong>：GNAO1综合征是一种罕见痾病，直到2013年才发现导致该综合征的遗传物质缺陷</p>
              <p className="text-gray-600"><strong>诊断挑战</strong>：由于对该综合征认识不足，部分患儿可能尚未得到正确诊断</p>
              <p className="text-gray-600"><strong>性别分布</strong>：可发生于男女两性，目前观察到的诊断病例中女性多于男性</p>
              <p className="text-gray-600"><strong>首发年龄特征</strong>：婴儿期发病主要表现为癫痫，幼儿期发病以运动障碍为主</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'genetics',
      title: '病因与遗传学',
      icon: Dna,
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">遗传物质异常</h4>
            <p className="text-gray-600 leading-relaxed">
              GNAO1综合征是由第16号染色体上GNAO1基因的突变引起的。在90%的患儿中，
              突变集中发生在第6号外显子和第7号外显子。最常见的突变类型为Glu246、Gly203和Arg209位点的改变。
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">遗传模式</h4>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li><strong>常染色体显性遗传</strong>：只要两条16号染色体中任意一条上的GNAO1基因存在突变，即可导致疾病</li>
              <li><strong>新发突变（de novo）</strong>：大多数患儿的基因突变是在受精卵形成后自发产生的，而非遗传自父母</li>
              <li><strong>生殖系嵌合</strong>：少数患儿的突变遗传自无症状的父母，父母仅在生殖细胞中存在突变</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-2">蛋白功能机制</h4>
            <p className="text-gray-600 leading-relaxed">
              GNAO1基因编码"异源三聚体鸟苷酸结合蛋白α亚基"（GNAO1蛋白），作为G蛋白的核心组分，
              在脑细胞间的信号传递过程中起关键作用。
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
              <li><strong>功能缺失型突变</strong>：导致GNAO1蛋白活性降低，主要引发癫痫发作</li>
              <li><strong>功能获得型突变</strong>：造成蛋白异常激活，更易导致运动障碍和/或智力障碍</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-2">神经生物学机制</h4>
            <div className="space-y-2">
              <p className="text-gray-600"><strong>基底神经节异常</strong>：GNAO1蛋白在基底神经节高度富集，影响多巴胺信号传导</p>
              <p className="text-gray-600"><strong>cAMP信号通路异常</strong>：突变影响环磷酸腺苷水平，导致神经递质释放紊乱</p>
              <p className="text-gray-600"><strong>神经递质失衡</strong>：多巴胺缺乏导致运动功能障碍，谷氨酸过量导致癫痫发作倾向</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'symptoms',
      title: '症状表现',
      icon: Stethoscope,
      content: (
        <div className="space-y-4">
          <div className="bg-green-50 border-l-4 border-green-400 p-4">
            <p className="text-sm text-green-800">
              <strong>每个孩子都是独特的：</strong> 
              以下症状仅为可能性参考，您的孩子不会全部呈现这些表现。
              您的孩子是独一无二的个体，远不止是一个"患者"——他/她可能温暖贴心、充满创意、幽默风趣、好奇心强、善于社交、活力四射。
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-2">早期表现</h4>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li><strong>肌张力低下</strong>：需完全托抱支撑，无法自主维持头部姿势，躯干/肢体肌肉显著松弛</li>
              <li><strong>发育迟缓</strong>：抬头、翻身等基础动作显著晚于同龄儿童</li>
              <li><strong>分娩困难</strong>：由于肌张力低下可能导致分娩过程较为困难</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-2">癫痫发作（约50%患儿）</h4>
            <div className="space-y-2">
              <p className="text-gray-600"><strong>婴儿期发作（大田原综合征型）</strong>：</p>
              <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                <li>出生后数月内高发</li>
                <li>肢体强直/节律性抽搐，发作时伴呼吸暂停</li>
                <li>呈丛集性发作，药物难治性癫痫</li>
              </ul>
              <p className="text-gray-600 mt-2"><strong>迟发型发作</strong>：凝视发作、全身强直、肌阵挛性抽动</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-2">运动障碍</h4>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li><strong>肌张力障碍</strong>：肢体/躯干异常姿势固定</li>
              <li><strong>舞蹈症</strong>：无目的不规律动作</li>
              <li><strong>口面部运动障碍</strong>：口腔/舌肌失控运动</li>
              <li><strong>运动迟缓</strong>：肌肉僵硬、动作启动困难</li>
              <li><strong>肌张力障碍持续状态</strong>：异常姿势持续&gt;30分钟，平均起病年龄6岁3个月</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-2">认知与学习</h4>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li><strong>智力障碍程度差异显著</strong>：从轻度到重度不等</li>
              <li><strong>语言功能障碍</strong>：多数患儿存在语言习得困难，可言语者通常仅能使用短句</li>
              <li><strong>眼手协调障碍</strong>：视觉引导运动功能受损</li>
              <li><strong>传统评估局限</strong>：眼动追踪技术可实现非语言认知评估</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-2">其他系统症状</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-medium text-gray-700">视觉功能</p>
                <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                  <li>脑性视觉障碍（CVI）</li>
                  <li>斜视、畏光反应</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-gray-700">口腔功能</p>
                <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                  <li>咬合/咀嚼困难</li>
                  <li>吞咽障碍、误吸风险</li>
                  <li>流涎症状</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-gray-700">消化系统</p>
                <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                  <li>胃食管反流（GERD）</li>
                  <li>便秘问题</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-gray-700">其他表现</p>
                <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                  <li>睡眠障碍（入睡困难、夜间觉醒）</li>
                  <li>性格开朗，频繁微笑/大笑</li>
                  <li>偏头痛倾向增高</li>
                  <li>刻板行为（摇摆、拔头发等）</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-2">骨骼与免疫系统</h4>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li><strong>脊柱侧弯</strong>：随年龄增长可能出现</li>
              <li><strong>髋关节发育不良</strong>：需定期骨科随访</li>
              <li><strong>骨质疏松风险</strong>：骨密度降低，轻微跌倒即可导致病理性骨折</li>
              <li><strong>感染易感性</strong>：婴幼儿期高发呼吸道感染、中耳炎</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'diagnosis',
      title: '诊断方法',
      icon: FileText,
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">临床初步评估</h4>
            <p className="text-gray-600 leading-relaxed">
              三联征提示：婴儿期起病的癫痫 + 全面发育迟缓 + 运动障碍。
              在常规血液检查中，GNAO1综合征儿童未发现特异性。
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">基因检测（确诊金标准）</h4>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li><strong>全外显子测序（WES）</strong>：检测16号染色体GNAO1基因测序</li>
              <li>常规染色体检查无法确诊</li>
              <li>90%的突变集中在第6、7号外显子</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-2">影像学检查</h4>
            <div className="space-y-2">
              <p className="text-gray-600"><strong>脑部MRI特征</strong>：</p>
              <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                <li>常见脑容量偏小</li>
                <li>髓鞘形成延迟或胼胝体发育不良（厚度变薄）</li>
                <li>1/6患儿可见基底核异常</li>
              </ul>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-2">代谢检测与脑电图</h4>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li><strong>代谢筛查</strong>：血尿代谢筛查通常无特异性异常，主要用于排除其他代谢性痾病</li>
              <li><strong>脑电图(EEG)</strong>：多灰性癫痫样放电、背景活动减慢</li>
              <li><strong>视觉证发电位（VEP）</strong>：证实视觉信号传导延迟</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-2">骨骼评估</h4>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>X线监测脊柱侧弯/髋关节发育异常</li>
              <li>骨密度检测（DEXA扫描）</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-2">鉴别诊断</h4>
            <p className="text-gray-600">
              需要与其他遗传性神经发育障碍进行鉴别，
              包括ADCY5综合征、PDE10A综合征等同样引起cAMP水平改变的疾病。
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'treatment',
      title: '治疗与管理',
      icon: Heart,
      content: (
        <div className="space-y-4">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <p className="text-sm text-yellow-800">
              <strong>重要提示：</strong> 
              目前尚无特效治疗方法，治疗主要以对症治疗为主。
              请务必在专业医生指导下进行治疗。
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">癫痫控制</h4>
            <div className="space-y-2">
              <p className="text-gray-600"><strong>急救药物</strong>（发作&gt;5分钟时）：</p>
              <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                <li>地西沮直肠、咖达唑仑鼻喷雾剂、劳拉西沮或氯硝西泮滴剂</li>
              </ul>
              <p className="text-gray-600 mt-2"><strong>长期控制药物</strong>：</p>
              <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                <li>苯巴比妈、氨己烯酸（Sabril）、丙戊酸钠（Depakine）</li>
                <li>左乙拉西坦（Keppra）、氯巴占(Frisium)、奥卡西平（Trileptal）</li>
                <li>托吡酶（Topamaxl）和唑尼沙胺（Zonegran）</li>
              </ul>
              <p className="text-gray-600 mt-2"><strong>其他治疗</strong>：生酮饮食、迷走神经刺激器或甲泡尼龙治疗</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-2">运动障碍治疗</h4>
            <div className="space-y-2">
              <p className="text-gray-600"><strong>药物组合</strong>：</p>
              <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                <li><strong>肌张力障碍</strong>：巴氯芬、苯海索、四苯喎唑、肉毒毒素注射</li>
                <li><strong>舞蹈症</strong>：氟哌啄醇、四苯喎唑（兼具改善肌张力障碍作用，成为首选）</li>
                <li><strong>联合用药</strong>：抗癫痫药如左乙拉西坦或托吡酶可能同时缓解癫痫和运动症状</li>
              </ul>
              <p className="text-gray-600 mt-2"><strong>手术治疗</strong>：</p>
              <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                <li><strong>巴氯芬泵</strong>：持续鞘内给药用于严重病例</li>
                <li><strong>脑深部电刺激（DBS）</strong>：靠向苍白球内侧部，2/3患儿有效，最年幼接受者为3岁</li>
              </ul>
              <div className="bg-orange-50 border-l-4 border-orange-400 p-3 mt-2">
                <p className="text-sm text-orange-800">
                  <strong>注意</strong>：药物通常有副作用，使用时应研究是否利大于弊。
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-2">营养与消化管理</h4>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li><strong>吠咽困雾</strong>：经鼻管喂养（NGT）或胃造瘦（PEG管/米奇按钮）</li>
              <li><strong>胃反流</strong>：抑酸药（奥美拉错）、角豆籽粉使食物变稠</li>
              <li><strong>便秘</strong>：聚乙二醇软化大便，辅以纤维和水分补充</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-2">康复支持</h4>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li><strong>言语治疗</strong>：辅助沟通系统（如图卡、语音设备）、吠咽训练</li>
              <li><strong>物理治疗</strong>：防关节变形，改善运动功能</li>
              <li><strong>作业治疗</strong>：优化日常生活技能及适配辅助器具</li>
              <li><strong>教育支持</strong>：多数患儿需特殊教育或日间照护中心</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-2">其他症状管理</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                  <li><strong>睡眠问题</strong>：固定作息、褐黑素（速释型/缓释型）</li>
                  <li><strong>流涎</strong>：行为训练、吸湿围兜、格隆溴铵、肉毒毒素</li>
                </ul>
              </div>
              <div>
                <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                  <li><strong>骨骼健康</strong>：每日补充维生素D(400IU)和钙(500mg)</li>
                  <li><strong>脊柱侧弯</strong>：石膏紧身胸衣或手术固定椎骨</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-2">家庭与社会支持</h4>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li><strong>心理支持</strong>：社工或心理学家帮助家庭应对长期照护压力</li>
              <li><strong>经济援助</strong>：可通过专项福利政策减轻医疗负担</li>
              <li><strong>病友社群</strong>：通过基金会（如GNAO1.org）或Facebook群组交流经验</li>
              <li><strong>父母陪伴</strong>：与孩子一起玩耐、嬉戏、跳舞、唱歌、聊天、大笑或阅读都是在进一步训练孩子</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'research',
      title: '研究进展与预后',
      icon: Users,
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">基础研究</h4>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li><strong>果蝇和小鼠试验</strong>：深入研究GNAO1基因突变的致病机制</li>
              <li><strong>蛋白功能研究</strong>：探索蛋白质功能异常如何导致神经发育障碍</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">治疗研发</h4>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li><strong>醉酸锌治疗</strong>：使用12周后无效可停止使用</li>
              <li><strong>基因治疗策略</strong>：研究新型基因治疗方法</li>
              <li><strong>高强度聚焦超声（HIFU）</strong>：新型非侵入性治疗技术</li>
              <li><strong>神经保护剂研究</strong>：针对神经损伤的新药物</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-2">临床试验</h4>
            <p className="text-gray-600">
              国际上正在进行多项相关的临床试验，
              为GNAO1患者带来新的治疗希望。包括新型抗癫痫药物、神经保护剂和基因治疗方法。
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-2">患者登记研究</h4>
            <p className="text-gray-600">
              建立患者数据库，收集自然病程数据，
              为新药研发和治疗方案优化提供重要信息。
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-2">预后情况</h4>
            <div className="space-y-2">
              <p className="text-gray-600"><strong>个体差异极大</strong>：需多学科团队制定个性化方案</p>
              <p className="text-gray-600"><strong>长期监测</strong>：癫痫演变、脊柱侧弯进展、视力变化、营养状态及心理健康</p>
              <p className="text-gray-600"><strong>成人患者</strong>：骨质疏松症几率增加，从小让患儿独立站立可避免此问题</p>
              <p className="text-gray-600"><strong>遇传的影响</strong>：大多数为新发突变，兄弟姐妹患病几率仅为1-2%</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-2">遗传咨询与产前诊断</h4>
            <p className="text-gray-600">
              对于已知突变的家庭，可在随后的怀孕期间进行产前诊断（包括绒毛取样或羊膜穿刺术）。
              临床遗传学家可以提供更多相关信息。
            </p>
          </div>
        </div>
      )
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              关于GNAO1相关疾病
            </h1>
            <p className="text-xl md:text-2xl opacity-90 leading-relaxed">
              了解GNAO1罕见病的基本知识、临床表现、诊断方法和治疗进展
            </p>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            {sections.map((section, index) => {
              const Icon = section.icon
              return (
                <Card key={section.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <CardTitle className="text-2xl">{section.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {section.content}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              相关资源
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">医疗资源</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    专业的医疗机构和专家信息，
                    帮助您找到合适的诊疗资源
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">科研文献</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    最新的研究论文和科学进展，
                    了解疾病研究的前沿动态
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">患者故事</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    真实的患者经历和家庭故事，
                    从中获得力量和经验分享
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm text-gray-600">
              <strong>免责声明：</strong>
              本网站提供的信息仅供教育和参考目的，不能替代专业医疗建议、诊断或治疗。
              请务必咨询合格的医疗专业人员获取个性化的医疗建议。
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}